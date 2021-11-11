import { Schema, model } from 'mongoose';
import { Enum_EstadoProyecto, Enum_Fase, Enum_TipoObjetivo } from './enums';
import { UserModel } from './user';

interface Proyecto {
    nombre: string;
    //   objetivos: objetivo;
    presupuesto: number;
    objetivos: [{ descripcion: String; tipo: Enum_TipoObjetivo }];
    fechaInicio: Date;
    fechaFin: Date;
    lider: Schema.Types.ObjectId;
    estado: Enum_EstadoProyecto;
    fase: Enum_Fase;
}

const proyectoSchema = new Schema<Proyecto>({
    nombre: {
        type: String,
        required: true,
        unique : true,
    },
    // objetivos: {
    //     type: objetivo,
    //     required: true,
    //     unique: true,
    // },
    objetivos: [
        {
          descripcion: {
            type: String,
            required: true,
          },
          tipo: {
            type: String,
            enum: Enum_TipoObjetivo,
            required: true,
          },
        },
      ],
    presupuesto: {
        type: Number,
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
     lider: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
     },
    estado: {
        type: String,
        required: true,
        enum: Enum_EstadoProyecto,
        default: Enum_EstadoProyecto.inactivo,
    },
    fase: {
        type: String,
        enum: Enum_Fase,
        default: Enum_Fase.nulo,
    }
});

const ProyectoModel = model('Proyecto', proyectoSchema);

export { ProyectoModel };