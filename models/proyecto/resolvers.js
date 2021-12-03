import { ProyectoModel } from './proyecto.js';

const resolversProyecto = {
  Query: {    
    Proyectos: async (parent, args, context) => {
      if (context.userData.rol === 'LIDER'){
        const proyectos = await ProyectoModel.find({lider: context.userData._id}).populate('lider').populate('avances').populate({ 
          path: 'inscripciones',
          populate: {
            path: 'estudiante'
          } 
       });
        return proyectos;
      }else if(context.userData.rol === 'ESTUDIANTE'){
        const proyectos = await ProyectoModel.find({estado: "ACTIVO"}).populate('lider').populate('avances').populate({ 
          path: 'inscripciones',
          populate: {
            path: 'estudiante'
          } 
       });
        return proyectos;
      }else {
        const proyectos = await ProyectoModel.find().populate('lider').populate('avances').populate({ 
          path: 'inscripciones',
          populate: {
            path: 'estudiante'
          } 
       });
        return proyectos;
      }      
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ProyectoModel.findOne({ _id: args._id });
      return proyecto;
    },
  },
  Mutation: {    
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProyectoModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivoGeneral: args.objetivoGeneral,
        objetivosEspecificos: args.objetivosEspecificos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args, context) => {

      // Verificar si es administrador
      //si sí, verificar si el estado actual(como esta en la db) es inactivo 
      //y el nuevo(args)  es activo, entonces
      //verificar si la fase actual (db) es pendiente, si sí poner el estado en iniciado
      //y se toma la fecha actual para el campo de fecha de inicio
      const proyecto = await ProyectoModel.findOne({ _id: args._id });
      if (context.userData.rol === 'ADMINISTRADOR' 
          && proyecto.estado === 'INACTIVO'
          && args.estado === 'ACTIVO'
          && proyecto.fase === 'PENDIENTE'){

              args.fase = 'INICIADO'

              const fecha = new Date()
              args.fechaInicio = fecha.toISOString().split('T')[0]
      }

      if (context.userData.rol === 'ADMINISTRADOR' 
          && proyecto.fase === 'DESARROLLO'
          && args.fase === 'TERMINADO'){

              args.fase = 'TERMINADO'

              const fecha = new Date()
              args.fechaFin = fecha.toISOString().split('T')[0]
      }  

      const proyectoEditado = await ProyectoModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivoGeneral: args.objetivoGeneral,
        objetivosEspecificos: args.objetivosEspecificos,
      },{new:true});

      return proyectoEditado;
    },
  },
};

export { resolversProyecto };