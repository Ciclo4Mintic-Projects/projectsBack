import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique : true,
    validate: {
         validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Ingresa un email valido',
      },
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    required: true,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  }
});

const UsuarioModel = model('Usuario', usuarioSchema);

export { UsuarioModel };
