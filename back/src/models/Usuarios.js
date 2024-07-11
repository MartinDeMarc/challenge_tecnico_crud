const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
      },
      usuario: {
        type: String,
        required: true,
        unique: true
      },
      contraseña: {
        type: String,
        required: true
      },
      dateCreated: {
        type: Date,
        default: Date.now
      },
 })


 const collection = new mongoose.model('usuarios', UsuarioSchema);

 module.exports = collection;