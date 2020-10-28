import mongoose from 'mongoose';


const asignaturaSchema = new mongoose.Schema({
    asignatura: {
        type: String,
        required: true
    },
    temas: [String]    
})

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);

module.exports = Asignatura;