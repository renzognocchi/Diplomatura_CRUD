const mongoose = require('mongoose');
const { Schema } = mongoose;

const electSchema = new Schema({
    codigo: Number,
    nombre: String,
    precio: Number, 
    categoria: [String]
})

const Dispositivo = mongoose.model('Dispositivo', electSchema)

module.exports = Dispositivo