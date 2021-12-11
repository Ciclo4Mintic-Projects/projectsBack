import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { gql } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import conectarBD from './db/db.js';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
await conectarBD();

const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
});

it('Consultar usuario', async () => {
    const result = await server.executeOperation({
        query: gql`
      query Usuario($id: String!) {
        Usuario(_id: $id) {
          correo
        }
      }
    `,
        variables: {
            id: '61a541a7f19a1d8b0180e7e0',
        },
    });

    assert.equal(result.data.Usuario.correo, 'carlos@rojas.com');
});

it('Consultar proyecto', async () => {
    const result = await server.executeOperation({
        query: gql`
        query Proyecto($id: String!) {
            Proyecto(_id: $id) {
                nombre
            }
        }
      `,
        variables: {
            id: "61a5460cf19a1d8b0180e7ff",
        },
    });

    assert.equal(result.data.Proyecto.nombre, "Determinacion de contaminacion en el sur");
});

it('Consultar inscripcion', async () => {
    const result = await server.executeOperation({
        query: gql`
        query Inscripcion($id: String!) {
            Inscripcion(_id: $id) {
                estudiante {
                _id
                }
            }
        }
      `,
        variables: {
            id: "61a9424e68028a3e5ca8e7ef",
        },
    });

    assert.equal(result.data.Inscripcion.estudiante._id, "61a54475f19a1d8b0180e7fa");
});

it('Consultar avance', async () => {
    const result = await server.executeOperation({
        query: gql`
        query Avance($id: String!) {
            Avance(_id: $id) {
                proyecto {
                _id
                }
            }
        }
      `,
        variables: {
            id: "61a82f696c339c0545161098",
        },
    });

    assert.equal(result.data.Avance.proyecto._id, "61a545bdf19a1d8b0180e7fd");
});

// it('creates user', async () => {
//   const result = await server.executeOperation({
//     query: gql`
//       mutation CrearUsuario(
//         $nombre: String!
//         $apellido: String!
//         $identificacion: String!
//         $correo: String!
//         $rol: Enum_Rol!
//       ) {
//         crearUsuario(
//           nombre: $nombre
//           apellido: $apellido
//           identificacion: $identificacion
//           correo: $correo
//           rol: $rol
//           password: $password
//         ) {
//           _id
//         }
//       }
//     `,
//     variables: {
//       nombre: 'Daniel',
//       apellido: 'Saldarriaga',
//       identificacion: '1234234',
//       correo: 'dsaldarriaga@prevalentware.com',
//       rol: 'ADMINISTRADOR',
//       password: '12345',
//     },
//   });

//   assert.notEqual(result.data.CrearUsuario, null);
// });