import { gql } from 'apollo-server-express';

const tiposProyecto = gql`  
 
  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: Usuario!
    objetivoGeneral: String!
    objetivosEspecificos: [String]!
  }

  type Query {
    Proyectos: [Proyecto]
  }

  type Mutation {
        
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: Date!
      fechaFin: Date!
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String!
      objetivoGeneral: String!
      objetivosEspecificos: [String]!
    ): Proyecto
  }
`;

export { tiposProyecto };