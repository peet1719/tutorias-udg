import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw("El correo es invalido")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Contraseña demasiado corta elige otra")
            }
        }
    },
    avatar: {
        type: Buffer
    }
},
    {
        timestamps: true
})


userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign(
        {
            _id: user.id.toString(),
            userName: user.userName,
            apellido: user.apellido,
            email: user.email,
            createdAt: user.createdAt,
            updateAt: user.updateAt
        }, "secretkeyChange", {expiresIn: '1h'})
    
    /* user.tokens = user.tokens.concat({ token })
    await user.save() */

    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    let user = await User.findOne({email: email})
    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user

}

// Encripta el password si este se actualiza
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Eliminar las tareas de un usuario eliminado
userSchema.pre('remove', async function(next){
    user = this

    await task.deleteMany({owner: user._id })
    next()
})

    
const User = mongoose.model('User', userSchema)

module.exports = User

