import { gql } from 'apollo-server-express';

const tiposAvance = gql`  
 
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
    titulo: String!
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(idProyecto: String!): [Avance]
    Avance(_id: String!):Avance
  }
  type Mutation {
    crearAvance(
      fecha: Date!
      descripcion: String!
      proyecto: String!
      creadoPor: String!
      titulo:String!
      ): Avance

    editarAvance(
      _id: String!
      fecha: Date
      descripcion: String
      proyecto: String
      creadoPor: String
      titulo:String
    ):Avance
  }
`;

export { tiposAvance };