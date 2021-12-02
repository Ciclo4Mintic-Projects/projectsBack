import { UsuarioModel } from './usuario.js'
import { generateToken } from "../../utils/tokenUtils.js";

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args, context) => {
      console.log('context', context);
      if(context.userData.rol === 'ADMINISTRADOR'){
        const usuarios = await UsuarioModel.find();
        return usuarios;        
      } else {
        return null;
      }
    },
    Usuario: async (parent, args) => {
      const usuario = await UsuarioModel.findOne({ _id: args._id });
      return usuario;
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
      },{new:true});

      return usuarioEditado;
    },
    editarPerfil: async (parent, args) => {
      const perfilEditado = await UsuarioModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
      },{new:true});
      return {
        token:generateToken({_id: perfilEditado._id,
          nombre: perfilEditado.nombre,
          apellido: perfilEditado.apellido,
          identificacion: perfilEditado.identificacion,
          correo: perfilEditado.correo,
          rol: perfilEditado.rol,
          estado: perfilEditado.estado}),
      };
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
  },
};

export { resolversUsuario };