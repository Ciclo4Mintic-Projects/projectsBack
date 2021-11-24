import { InscripcionModel } from './inscripcion.js';

let date = new Date();
const resolversInscripcion = {
  Query: {    
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscripcionModel.find().populate('estudiante').populate({path:'proyecto',
    populate: {
      path:'lider'
    }});
      return inscripciones;
    },
    Inscripcion: async (parent, args) => {
      const inscripcion = await InscripcionModel.findOne({ _id: args._id }).populate('proyecto').populate('estudiante');
      return inscripcion;
    },
  },
  Mutation: {    
    crearInscripcion: async (parent, args) => {
      const inscripcion = await InscripcionModel.findOne({ $and: [{proyecto: args.proyecto}, {estudiante: args.estudiante}] });
      if(inscripcion){
        console.log('Registro existente')
      }else{
        const inscripcionCreada = await InscripcionModel.create({
          proyecto: args.proyecto,
          estudiante: args.estudiante,
          estado: args.estado,
          fechaIngreso: args.fechaIngreso,
          fechaEgreso: args.fechaEgreso,
        });
        return inscripcionCreada;
      }      
    },
    aprobarInscripcion: async (parent, args) => {      
      if (Object.values(args).includes('ACEPTADO')){
        const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(args._id,
          {
            estado: args.estado,
            fechaIngreso: date.setHours(date.getHours() - 5),
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
    },inscripcionTerminada: async (parent, args) => {      
        const inscripcionTerminada = await InscripcionModel.updateMany({proyecto: "61966bb3f62d94f61dd64ac6"},//como traer campos de objeto referencia {proyecto:{fase:'TERMINADO'}
          {
            fechaEgreso: date.setHours(date.getHours() - 5),
          }
        );
        return inscripcionTerminada;      
    },inscripcionNula: async (parent, args) => {      
      const inscripcionNula = await InscripcionModel.updateMany({fase: 'TERMINADO'},//trabajar con args._id y como implementarlo en el get de proyecto
        {
          fechaEgreso: null,
        }
      );
      return inscripcionNula;      
  },
  },
};

export { resolversInscripcion };