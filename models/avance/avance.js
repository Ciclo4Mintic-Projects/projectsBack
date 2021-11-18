import mongoose from 'mongoose';
import { UsuarioModel } from '../usuario/usuario.js';
import { ProyectoModel } from '../proyecto/proyecto.js';
const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProyectoModel,
  },
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
      {
        type: String,
        //default:null,
    }
  ],
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UsuarioModel,
  }
});

const AvanceModel = model('Avance', avanceSchema);

export { AvanceModel };
