import { ProyectoModel } from '../models/proyecto';
import { UsuarioModel } from '../models/usuario';

const resolvers = {
  Query: {
    Usuarios: async (parent, args) => {
      const usuarios = await UsuarioModel.find();
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UsuarioModel.findOne({ _id: args._id });
      return usuario;
    },
    Proyectos: async (parent, args) => {
      const proyectos = await ProyectoModel.find().populate('lider');
      return proyectos;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UsuarioModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UsuarioModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado,
      });

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UsuarioModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UsuarioModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProyectoModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
  },
};

export { resolvers };