import { gql } from "apollo-server-express";


const tiposAutenticacion = gql`

    type Mutation {
        registro(
            nombre: String!
            apellido: String!
            identificacion: String!
            correo: String!
            rol: Enum_Rol!
            estado: Enum_EstadoUsuario
            password: String!
        ): String!
    }
`;

export { tiposAutenticacion };