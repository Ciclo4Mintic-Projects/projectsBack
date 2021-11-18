import { InscripcionModel } from './inscripcion.js';

const resolversInscripcion = {
  Query: {    
    Inscripcion: async (parent, args) => {
      const inscripcion = await InscripcionModel.find().populate('proyecto').populate('estudiante');
      return inscripcion;
    },
  },
  Mutation: {    
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscripcionModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
        estado: args.estado,
        fechaIngreso: args.fechaIngreso,
        fechaEgreso: args.fechaEgreso,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args.id, {
        estado: 'ACEPTADO',
        fechaIngreso: Date.now(),
      });
      return inscripcionAprobada;
    },
  },
};

export { resolversInscripcion };