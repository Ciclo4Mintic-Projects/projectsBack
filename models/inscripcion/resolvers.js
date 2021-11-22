import { InscripcionModel } from './inscripcion.js';

const resolversInscripcion = {
  Query: {    
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscripcionModel.find().populate('proyecto').populate('estudiante');
      return inscripciones;
    },
    Inscripcion: async (parent, args) => {
      const inscripcion = await InscripcionModel.findOne({ _id: args._id }).populate('proyecto').populate('estudiante');
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
      if (Object.values(args).includes('ACEPTADO')){
        const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args._id,
          {
            estado: args.estado,
            fechaIngreso: Date.now(),
          }, {new: true}
        );
        return inscripcionAprobada;
      }else {
        const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args._id,
          {
            estado: args.estado,
            fechaIngreso: null,
          }, {new: true}
        );
        return inscripcionAprobada;
      }
      // const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args._id, {
      //   estado: args.estado,
      //   if (args.estado === 'ACEPTADO'){
      //     fechaIngreso: Date.now(),
      //   }        
      // },{new:true});
      // return inscripcionAprobada;
    },
  },
};

export { resolversInscripcion };