import mongoose from 'mongoose';
import { UsuarioModel } from '../usuario/usuario.js';
import { ProyectoModel } from '../proyecto/proyecto.js';
const { Schema, model } = mongoose;


const inscripcionSchema = new Schema({
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProyectoModel,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UsuarioModel,
  },
  estado: {
    type: String,
    enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
    default: 'PENDIENTE',
  },
  fechaIngreso: {
    type: String,
    default:null,
  },
  fechaEgreso: {
    type: String,
    default: null,
  }
});

const InscripcionModel = model('Inscripcion', inscripcionSchema);

export { InscripcionModel };
