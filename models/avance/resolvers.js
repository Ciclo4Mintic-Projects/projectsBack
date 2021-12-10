import { AvanceModel } from './avance.js';
import { InscripcionModel } from '../inscripcion/inscripcion.js';
import { ProyectoModel } from '../proyecto/proyecto.js';


const resolversAvance = {
  Query: {
    Avances: async (parent, args, context) => {
      if (context.userData.rol === 'ESTUDIANTE') {
        const inscripciones = await InscripcionModel.find({ $and: [{ estudiante: context.userData._id }, { estado: "ACEPTADO" }] })
        console.log(inscripciones)
        if (inscripciones) {
          const avances = await AvanceModel.find({ proyecto: inscripciones.map(p => p.proyecto) }).populate('proyecto').populate('creadoPor');
          return avances;
        } else {
          console.log("no hay avances")
        }
      } else if (context.userData.rol === 'LIDER') {
        const proyectos = await ProyectoModel.find({ lider: context.userData._id })
        console.log(proyectos)
        if (proyectos) {
          const avances = await AvanceModel.find({ proyecto: proyectos.map(p => p._id) }).populate('proyecto').populate('creadoPor');
          return avances;
        } else {
          console.log("no hay avances")
        }
      } else {
        const avances = await AvanceModel.find().populate('proyecto').populate('creadoPor');
        return avances;
      }
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
      console.log('args', args)
      //Validando si el estudiante esta rechazado en el proyecto
      const inscripcionEstudiante = await InscripcionModel.find({proyecto:args.proyecto, estudiante:args.creadoPor, estado: "RECHAZADO" });
      console.log('inscripcionEstudiante', inscripcionEstudiante)
      if(inscripcionEstudiante.length > 0){
        return {
          mensaje: "No puedes registrar avances de este proyecto",
          estado: "error"
        };
      } 

      const avanceCreado = await AvanceModel.create({
        proyecto: args.proyecto,
        fecha: args.fecha,
        descripcion: args.descripcion,
        observaciones: args.observaciones,
        creadoPor: args.creadoPor,
        titulo: args.titulo,
      });

      //Validando si es el primer avance creado, para automaticamente cambiar el estado del proyecto
      const filtrarAvance = await AvanceModel.find({ proyecto: args.proyecto });
      if(filtrarAvance.length === 1){
        await ProyectoModel.findOneAndUpdate({ _id:args.proyecto, fase: 'INICIADO'} ,  { fase:'DESARROLLO' });
      }     
      return {
        mensaje: "El avance ha sido registrado",
        estado: "exito"
      };
       
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await AvanceModel.findByIdAndUpdate(args._id, {
        proyecto: args.proyecto,
        fecha: args.fecha,
        descripcion: args.descripcion,
        creadoPor: args.creadoPor,
        titulo: args.titulo,
      }, { new: true })
      return avanceEditado;
    },
    eliminarAvance: async (parent, args) => {
      const avanceEliminado = await AvanceModel.findOneAndDelete({ _id: args._id })
      return avanceEliminado;
    },
    crearObservacion: async (parent, args) => {
      //const actualObservaciones = await AvanceModel.findOne({ _id: args._id }).observaciones
      const observacionCreada = await AvanceModel.findByIdAndUpdate(args._id, {
        $push: { observaciones: args.observacion }
      }, { new: true })
      return observacionCreada
    }
  },
};

export { resolversAvance };