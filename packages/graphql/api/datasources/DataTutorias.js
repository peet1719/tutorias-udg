import { DataSource } from 'apollo-datasource';
import User from './../../models/user';
import Asignatura from './../../models/asignatura';
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
            await user.save()
            const token = await user.generateAuthToken()
            /* res.status(201).send({user, token}) */
            return { user, token };
        } catch (e) {
            /* res.status(400).send(e) */
            console.log(e)
            return false;
        }
    }

    async login(email, password) {
        try {
            const user = await User.findByCredentials(email, password)
            const token = await user.generateAuthToken()
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
}


export default DataTutorias;