import { Schema, model } from 'mongoose';
import { updateImportEqualsDeclaration } from 'typescript';
import { Enum_EstadoInscripcion } from './enums';

interface Inscripcion {
  //proyecto: proyecto;
  //estudiante: usuario;
  estado: Enum_EstadoInscripcion;
  fechaIngreso: Date;
  fechaEgreso:Date;
  
}

const inscripcionSchema = new Schema<Inscripcion>({
 /*  proyecto: {
    type: proyecto,
    required: true,
  },
  estudiante: {
    type: usuario,
    required: true,
  }, */
  estado: {
    type: String,
    enum: Enum_EstadoInscripcion,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaEgreso: {
    type: Date,
    required: true,
  }
});

const InscripcionModel = model('Inscripcion', inscripcionSchema);

export { InscripcionModel };
