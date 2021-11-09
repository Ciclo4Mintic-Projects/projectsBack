import { Schema, model } from 'mongoose';
import { updateImportEqualsDeclaration } from 'typescript';
import { Enum_TipoObjetivo } from './enums';

interface Objetivo {
  descripcion: string;
  tipo: Enum_TipoObjetivo;
  //proyecto:proyecto;
}

const objetivoSchema = new Schema<Objetivo>({
 /*  proyecto: {
    type: proyecto,
    required: true,
  },
 */
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: Enum_TipoObjetivo,
  }
});

const ObjetivoModel = model('Objetivo', objetivoSchema);

export { ObjetivoModel };
