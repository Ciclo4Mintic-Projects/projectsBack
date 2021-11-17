import { Schema, model } from 'mongoose';
import { Enum_Rol, Enum_EstadoUsuario } from './enums';

interface Usuario {
  correo: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  rol: Enum_Rol;
  estado: Enum_EstadoUsuario;
}

const usuarioSchema = new Schema<Usuario>({
  correo: {
    type: String,
    required: true,
    unique : true,
    validate: {
         validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Ingresa un email valido',
      },
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: Enum_Rol,
  },
  estado: {
    type: String,
    required: true,
    enum: Enum_EstadoUsuario,
    default: Enum_EstadoUsuario.PENDIENTE,
  }
});

const UsuarioModel = model('Usuario', usuarioSchema);

export { UsuarioModel };
