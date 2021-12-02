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
      rol: Enum_Rol
    ): Token

    eliminarUsuario(_id: String, correo: String): Usuario
    
  }
`;

export { tiposUsuario };
  