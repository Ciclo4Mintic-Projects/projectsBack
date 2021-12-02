import { AvanceModel } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await AvanceModel.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    Avance: async (parent, args) => {
      const avance = await AvanceModel.findOne({ _id: args._id }).populate('proyecto').populate('creadoPor');
      return avance
    },
    filtrarAvance: async (parent, args) => {
      const avanceFiltrado = await AvanceModel.find({ proyecto: args.idProyecto }).populate('proyecto').populate('creadoPor');
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
        titulo: args.titulo,
      });
      return avanceCreado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await AvanceModel.findByIdAndUpdate(args._id, {
        proyecto: args.proyecto,
        fecha: args.fecha,
        descripcion: args.descripcion,
        observaciones: args.observaciones,
        creadoPor: args.creadoPor,
        titulo: args.titulo,
      }, { new: true })
      return avanceEditado;
    },
    eliminarAvance: async (parent, args) => {
      const avanceEliminado = await AvanceModel.findOneAndDelete({ _id: args._id })
      return avanceEliminado;
    }
  },
};

export { resolversAvance };