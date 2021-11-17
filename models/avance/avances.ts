import { Schema, model } from 'mongoose';
import { UsuarioModel } from '../usuario/usuario';
import { ProyectoModel } from '../proyecto/proyecto';

interface Avance {
  proyecto: Schema.Types.ObjectId;
  fecha: Date;
  descripcion: string;
  observaciones: string;
  creadoPor: Schema.Types.ObjectId;
}

const avanceSchema = new Schema<Avance>({
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

const AvanceModel = model('avance', avanceSchema);

export { AvanceModel };
