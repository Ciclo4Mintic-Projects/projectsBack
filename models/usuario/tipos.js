import { gql } from 'apollo-server-express';

const tiposUsuario = gql`

  type Token {
    token:String
    error:String
  }
  
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
  }  

  type Message {
    message: String,
    type: String
  }

  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
    ): Usuario

    editarUsuario(
      _id: String!
      nombre: String
      apellido: String
      identificacion: String
      correo: String
      rol: Enum_Rol
      estado: Enum_EstadoUsuario
    ): Usuario

    editarPerfil(
      _id: String!
      nombre: String
      apellido: String
      identificacion: String
      correo: String
    ): Token

    cambiarPassword(
      _id: String, 
      password: String, 
      newpassword: String, 
      verifypassword: String
      ): Message

    eliminarUsuario(_id: String, correo: String): Usuario
    
  }
`;

export { tiposUsuario };
  