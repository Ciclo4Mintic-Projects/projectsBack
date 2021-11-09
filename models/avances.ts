import { Schema, model } from 'mongoose';

interface Avance {
  //proyecto: proyecto;
  fecha: Date;
  descripcion: string;
  observaciones: string;
  //creadoPor: usuario;
}

const avanceSchema = new Schema<Avance>({
  //proyecto: {
    //type: proyecto,
    //required: true,
  //},
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: {
    type: String,
    required: true,
  },
/*   creadoPor: {
    type: usuario,
    required: true,
  } */
});

const AvanceModel = model('avance', avanceSchema);

export { AvanceModel };
