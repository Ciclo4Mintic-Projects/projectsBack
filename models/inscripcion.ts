import { Schema, model } from 'mongoose';
import { updateImportEqualsDeclaration } from 'typescript';
import { Enum_EstadoInscripcion } from './enums';
import { UserModel } from './user';
import { ProyectoModel } from './proyecto';

interface Inscripcion {
  proyecto: Schema.Types.ObjectId;
  estudiante: Schema.Types.ObjectId;
  estado: Enum_EstadoInscripcion;
  fechaIngreso: Date;
  fechaEgreso:Date;
  
}

const inscripcionSchema = new Schema<Inscripcion>({
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProyectoModel,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },
  estado: {
    type: String,
    enum: Enum_EstadoInscripcion,
    default: Enum_EstadoInscripcion.rechazado,
  },
  fechaIngreso: {
    type: Date,
    default:null,
  },
  fechaEgreso: {
    type: Date,
    default: null,
  }
});

const InscripcionModel = model('Inscripcion', inscripcionSchema);

export { InscripcionModel };
