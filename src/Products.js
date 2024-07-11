const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const electSchema = new Schema({
    codigo: Number,
    nombre: String,
    precio: Number,
    categorias: [String],
})

const Dispositivo = mongoose.model('Dispositivo', electSchema)

module.exports = Dispositivo