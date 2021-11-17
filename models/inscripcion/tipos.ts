import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`  
 
type Inscripcion {
    _id: ID!
    proyecto: Proyecto!
    estudiante: Usuario!
    estado: Enum_EstadoInscripcion
    fechaIngreso: Date
    fechaEgreso:Date
  }

  type Query {
    Inscripcion: [Inscripcion]
  }
  type Mutation {
    crearInscripcion(proyecto: String!, estudiante: String!, estado: Enum_EstadoInscripcion, fechaIngreso: Date, fechaEgreso: Date): Inscripcion
  }
`;

export { tiposInscripcion };