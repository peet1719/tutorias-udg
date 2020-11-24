import { DataSource } from 'apollo-datasource';
import User from './../../models/user';
import Asignatura from './../../models/asignatura';
import validator from 'validator';
import { transport, MailGenerator, transporter } from './../../configEmails';
import jwt from 'jsonwebtoken';

class DataTutorias extends DataSource {
    constructor() {
        super();
    }

    async getUsers() {
        try {
            const users = User.find();
            return users;

        } catch (e) {
            false;
        }
    }

    async createUser(UserInput) {

        const user = new User(UserInput)

        try {
            //arrojar exepcion si el correo es invalido 
            if (!validator.isEmail(UserInput.email)) {
                throw new Error("El correo es invalido")
            }
            //arrojar exepcion si el correo ya existe
            const findEmail = await User.findOne({ email: UserInput.email })
            if (findEmail) {
                throw new Error("Este coreo ya fue registrado")
            }

            /* await user.save() */
            const token = await user.generateToken('verificationEmail')
            console.log(token)
            this.sendVerificationEMail(token)
            /* res.status(201).send({user, token}) */
            return { user, token };
        } catch (e) {
            /* res.status(400).send(e) */
            return e;
        }
    }

    async login(email, password) {
        try {
            const user = await User.findByCredentials(email, password)
            const token = await user.generateToken('auth')
            /* res.send({user, token}) */
            return { user, token }
        } catch (e) {
            return false;
            /* res.status(500).send(e) */
        }
    }

    async getAsignaturas() {
        try {
            const asignaturas = await Asignatura.find();
            return asignaturas;

        } catch (e) {
            return false;
        }
    }

    async createAsignatura(asignaturaInput) {

        const existeAsignatura = await Asignatura.findOne({ "asignatura": asignaturaInput.asignatura });
        if (existeAsignatura) {
            // Si la asignatura existe se agrega a su array correspondiente 
            const asignatura = await Asignatura.findOneAndUpdate(
                { asignatura: asignaturaInput.asignatura },
                { "$push": { "temas": asignaturaInput.tema } }
            )

            try {
                const response = await asignatura.save()
                /* res.status(201).send({user, token}) */
                return response;
            } catch (e) {
                /* res.status(400).send(e) */
                return false;
            }


        } else {
            // Si la asignatura no existe se crea un nuevo registro
            const nuevaAsignatura = { "asignatura": asignaturaInput.asignatura, "temas": [asignaturaInput.tema] }
            const asignatura = new Asignatura(nuevaAsignatura)

            try {
                const response = await asignatura.save()
                /* res.status(201).send({user, token}) */
                return asignatura;
            } catch (e) {
                /* res.status(400).send(e) */
                return false;
            }
        }


    }

    async sendVerificationEMail(token) {
        if (!token) return null;

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        let response = {
            body: {
                name: decode.userName,
                intro: "¡Bienvenido a tutoUDG!, gracias por registarte. Estamos muy emocionados de tenerte con nosotros.",
                action: {
                    instructions: "Para empezar a usar la plataforma por favor verifica tu cuenta.",
                    button: {
                        color: "#22BC66",
                        text: "Confirmar",
                        link: `${process.env.URL}account/verify?token=${token}`
                    }
                },
                greeting: "Hola",
                signature: "Atentamente",
                outro: "Si tu no solicitates la creación de esta cuenta, no necesitas hacer nada.",
            }
        }

        let mail = MailGenerator.generate(response);

        let message = {
            from: process.env.EMAIL,
            to: decode.email,
            subject: "Validar email",
            html: mail
        }
        try {
            await transporter.sendMail(message)
        } catch (e) {
            console.log(e)
        }

    }

    //request email for reset password
    async resetPassword(email) {
        try {
            const user = await User.findOne({ email: email })
            const token = await user.generateToken('resetPassword')
            
            if (user) {
                let response = {
                    body: {
                        name: user.userName,
                        intro: "Restaura tu contraseña",
                        action: {
                            instructions: "Para cambiar tu contraseña haz click en el siguiente botón",
                            button: {
                                color: "#22BC66",
                                text: "Confirmar",
                                link: `${process.env.URL}account/reset_password?token=${token}`
                            }
                        },
                        greeting: "Hola",
                        signature: "Atentamente",
                        outro: "Si tu no solicitates el cambio de contraseña puedes ingnorar este email",
                    }
                }

                let mail = MailGenerator.generate(response);

                let message = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Solicitud de cambio de contraseña",
                    html: mail
                }
                try {
                    await transporter.sendMail(message)
                    return "Correo enviado"
                } catch (e) {
                    console.log(e)
                }
            }
        } catch (e) {
            
            throw new Error("El email no es valido o no esta registrado todavía")
        }

    }

    //change Password
    async changePassword(email, password) {
        try{
            const user = await User.findOne({email: email})
            user["password"] = password
            console.log(user)
            const response =  await user.save()
            return response;
        }catch(e){
            console.log(e)
            throw new Error("No se ha podido cambiar tu contraseña.")
        }

        
    }


    async validateVerificationToken(token) {
        if (!token) return null;
        var decode = {}
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log(err)
                throw new Error("El token es invalido o ha expirado")
            }
            decode = decoded;
        });

        try {
            //se eliminan las propiedas del token que no necesita el usuario.
            delete decode.iat
            delete decode.exp
            const user = new User(decode)
            console.log(decode)
            await user.save()

            return { title: "Gracias", text: "Tu cuenta ha sido verificada", successful: true }

        } catch (e) {
            console.log(e)
            throw new Error("Ya haz verificado tu email, ingresa a tu cuenta")
        }


    }
    validateToken(token){
        if (!token) return false;
        try{
            jwt.verify(token, process.env.JWT_SECRET)
            return true
        }catch(e){
            console.log(e)
            throw new Error("El token es invalido o ha expirado")
        }
        /* var decode = {}
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log(err)
                throw new Error("El token es invalido o ha expirado")
            }
            decode = decoded;
        }); */

    }

}


export default DataTutorias;