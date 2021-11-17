import { Schema, model } from 'mongoose';
import { Enum_EstadoProyecto, Enum_Fase, Enum_TipoObjetivo } from '../enums/enums';
import { UsuarioModel } from '../usuario/usuario';

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
        ref: UsuarioModel,
     },
    estado: {
        type: String,
        required: true,
        enum: Enum_EstadoProyecto,
        default: Enum_EstadoProyecto.INACTIVO,
    },
    fase: {
        type: String,
        enum: Enum_Fase,
        default: Enum_Fase.NULO,
    }
});

const ProyectoModel = model('Proyecto', proyectoSchema);

export { ProyectoModel };