import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`  
 
type Inscripcion {
    _id: ID!
    proyecto: Proyecto!
    estudiante: Usuario!
    estado: Enum_EstadoInscripcion
    fechaIngreso: String
    fechaEgreso: String
  }

  type Query {
    Inscripciones: [Inscripcion]
    Inscripcion(_id: String!): Inscripcion
  }
  type Mutation {
    crearInscripcion(proyecto: String!, estudiante: String!, estado: Enum_EstadoInscripcion, fechaIngreso: String, fechaEgreso: String): Inscripcion

    aprobarInscripcion(_id: String!, estado: Enum_EstadoInscripcion, fechaIngreso: String): Inscripcion

    inscripcionTerminada(proyecto: String!): [Inscripcion]

    inscripcionNula(proyecto: String!): [Inscripcion]
  }
`;

export { tiposInscripcion };