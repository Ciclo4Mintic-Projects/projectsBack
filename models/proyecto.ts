import { Schema, model } from 'mongoose';
import { Enum_EstadoProyecto, Enum_Fase } from './enums';

interface Proyecto {
    nombre: string;
    //   objetivos: objetivo;
    presupuesto: number;
    fechaInicio: Date;
    fechaFin: Date;
    //   lider: Usuario;
    estado: Enum_EstadoProyecto;
    fase: Enum_Fase;
}

const proyectoSchema = new Schema<Proyecto>({
    nombre: {
        type: String,
        required: true,
    },
    // objetivos: {
    //     type: objetivo,
    //     required: true,
    //     unique: true,
    // },
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
    // lider: {
    //     type: user,
    //     required: true,
    //     enum: Enum_EstadoUsuario,
    // }
    estado: {
        type: String,
        required: true,
        enum: Enum_EstadoProyecto
    },
    fase: {
        type: String,
        required: true,
        enum: Enum_Fase
    }
});

const ProyectoModel = model('Proyecto', proyectoSchema);

export { ProyectoModel };