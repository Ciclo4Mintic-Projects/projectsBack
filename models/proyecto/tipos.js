import { gql } from 'apollo-server-express';

const tiposProyecto = gql`  
 
  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: String
    fechaFin: String
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: Usuario!
    objetivoGeneral: String!
    objetivosEspecificos: [String]!
    avances: [Avance]
    inscripciones: [Inscripcion]
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
  }

  type Mutation {
        
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: String
      fechaFin: String
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String!
      objetivoGeneral: String!
      objetivosEspecificos: [String]!
    ): Proyecto

    editarProyecto(
      _id: String!
      nombre: String
      presupuesto: Float
      fechaInicio: String
      fechaFin: String
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String
      objetivoGeneral: String
      objetivosEspecificos: [String]
    ): Proyecto
  }
`;

export { tiposProyecto };