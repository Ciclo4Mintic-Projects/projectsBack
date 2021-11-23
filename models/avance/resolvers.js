import { AvanceModel } from './avance.js';

const resolversAvance = {
  Query: {    
    Avances: async (parent, args) => {
      const avance = await AvanceModel.find().populate('proyecto').populate('creadoPor');
      return avance;
    },
    filtrarAvance: async (parent, args) => {
        const avanceFiltrado = await AvanceModel.find({proyecto:args.idProyecto}).populate('proyecto').populate('creadoPor');
        return avanceFiltrado;
    },
  },
  Mutation: {    
    crearAvance: async (parent, args) => {
      const avanceCreado = await AvanceModel.create({
        proyecto: args.proyecto,
        fecha: args.fecha,
        descripcion: args.descripcion,
        observaciones: args.observaciones,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
  },
};

export { resolversAvance };