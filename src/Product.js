const mongoose = require('mongoose')
const { Schema } = mongoose;

const electSchema = new Schema({
    codigo: { type: Number, index: true },
    nombre: String,
    precio: Number,
    categorias: [String]
})

const Dispositivo = mongoose.model('dispositivo', electSchema)


  module.exports = Dispositivo