import { Schema, model } from 'mongoose';
import { Enum_EstadoProyecto, Enum_Fase } from '../enums/enums';
import { UsuarioModel } from '../usuario/usuario';

interface Proyecto {
    nombre: string;
    objetivoGeneral: string;
    objetivosEspecificos: [string]
    presupuesto: number;
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
    objetivoGeneral: {
        type: String,
        required: true
    },
    objetivosEspecificos: [
        {
            type: String, 
            required: true
        }        
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