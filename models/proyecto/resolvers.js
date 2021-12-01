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
    editarProyecto: async (parent, args) => {
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