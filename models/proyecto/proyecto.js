import mongoose from 'mongoose';
import { UsuarioModel } from '../usuario/usuario.js';
const { Schema, model } = mongoose;

const proyectoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    objetivoGeneral: {
        type: String,
        required: true
    },
    objetivosEspecificos: [
        {
            type: String,
            required: true,
        }
    ],
    presupuesto: {
        type: Number,
        required: true,
    },
    fechaInicio: {
        type: String,
        required: false,
        default: null
    },
    fechaFin: {
        type: String,
        required: false,
        default: null
    },
    lider: {
        type: Schema.Types.ObjectId,
        ref: UsuarioModel,
    },
    estado: {
        type: String,
        required: true,
        enum: ['ACTIVO', 'INACTIVO'],
        default: 'INACTIVO',
    },
    fase: {
        type: String,
        enum: ['INICIADO', 'DESARROLLO', 'TERMINADO', 'PENDIENTE'],
        default: 'PENDIENTE',
    }
},
{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
}
    
);

proyectoSchema.virtual('avances', {
    ref: 'Avance',
    localField: '_id',
    foreignField: 'proyecto',
});

proyectoSchema.virtual('inscripciones', {
    ref: 'Inscripcion',
    localField: '_id',
    foreignField: 'proyecto',
});

const ProyectoModel = model('Proyecto', proyectoSchema);

export { ProyectoModel };