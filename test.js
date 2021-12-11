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

it('Crear proyecto', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation CrearProyecto(
            $nombre: String!, 
            $presupuesto: Float!, 
            $lider: String!, 
            $objetivoGeneral: String!, 
            $objetivosEspecificos: [String]!) {
        crearProyecto(
            nombre: $nombre, 
            presupuesto: $presupuesto, 
            lider: $lider, 
            objetivoGeneral: $objetivoGeneral, 
            objetivosEspecificos: $objetivosEspecificos) {
            _id  
            }
        }
      `,
        variables: {
            nombre: "Proyecto test 1",
            presupuesto: 100,  
            lider: "61a54327f19a1d8b0180e7e8",
            objetivoGeneral: "Objetivo test 1",
            objetivosEspecificos: ["objetivo especifico test", "objetivos test 2"]
        },
    });

    assert.equal(result.data.CrearProyecto, undefined);
});

it('Crear registro', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation Registro(
            $nombre: String!, 
            $apellido: String!, 
            $identificacion: String!, 
            $correo: String!, 
            $rol: Enum_Rol!, 
            $password: String!, 
            $verifypassword: String!) {
        registro(
            nombre: $nombre, 
            apellido: $apellido, 
            identificacion: $identificacion, 
            correo: $correo, 
            rol: $rol, 
            password: $password, 
            verifypassword: $verifypassword) {
                token
                error
            }
        }
      `,
        variables: {
            nombre: "test",
            apellido: "usuario",  
            identificacion: "000021",
            correo: "test@usuario.com",  
            rol: "ADMINISTRADOR",
            password: "1234",
            verifypassword: "1234"
        },
    });

    assert.equal(result.data.Registro, undefined);
});

it('Crear inscripcion', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation CrearInscripcion(
            $proyecto: String!, 
            $estudiante: String!) {
        crearInscripcion(
            proyecto: $proyecto, 
            estudiante: $estudiante) {
            _id  
            }
        }
      `,
        variables: {
            proyecto: "61b4f4aa99cd49e5de872297",
            estudiante: "61a5438ef19a1d8b0180e7ed"
        },
    });

    assert.equal(result.data.CrearInscripcion, undefined);
});

// it('Crear Avance', async () => {
//     const result = await server.executeOperation({
//         query: gql`
//        mutation CrearAvance(
//            $fecha: Date!, 
//            $descripcion: String!, 
//            $proyecto: String!, 
//            $creadoPor: String!, 
//            $titulo: String!) {
//         crearAvance(
//             fecha: $fecha, 
//             descripcion: $descripcion, 
//             proyecto: $proyecto, 
//             creadoPor: $creadoPor, 
//             titulo: $titulo) {
//             estado
//         }
//       `,
//         variables: {
//             fecha: "2021-02-10",
//             descripcion: "test avance",  
//             proyecto: "61b4f4aa99cd49e5de872297",
//             creadoPor: "61a5438ef19a1d8b0180e7ed",
//             titulo: "test avance 1"
//         },
//     });
//     console.log(result.data.CrearAvance)

//     assert.equal(result.data.CrearAvance, null);
// });

it('Editar proyecto', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation EditarProyecto(
            $id: String!, 
            $presupuesto: Float) {
        editarProyecto(
            _id: $id, 
            presupuesto: $presupuesto) {
                _id
            }
        }
      `,
        variables: {
            id: "61b4f4aa99cd49e5de872297",
            presupuesto: 250
        },
    });
   
    assert.equal(result.data.EditarProyecto, undefined);
});

it('Editar usuario', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation EditarUsuario(
            $id: String!, 
            $nombre: String) {
        editarUsuario(
            _id: $id, 
            nombre: $nombre) {
            _id
            }
        }
      `,
        variables: {
            id: "61b4fa0b4c05bdf4ec40e6a8",
            nombre: "testNuevo"
        },
    });
    
    assert.equal(result.data.EditarUsuario, undefined);
});

it('Editar inscripcion', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation AprobarInscripcion($id: String!) {
        aprobarInscripcion(_id: $id) {
            _id  
            }
        }
      `,
        variables: {
            id: "61b51a436d7aa3b489f1a677"
        },
    });
    
    assert.equal(result.data.AprobarInscripcion, undefined);
});

it('Editar avance', async () => {
    const result = await server.executeOperation({
        query: gql`
        mutation EditarAvance($id: String!, $descripcion: String) {
        editarAvance(_id: $id, descripcion: $descripcion) {
                _id
            }
        }
      `,
        variables: {
            id: "61b51ca4b95e3dd87d2607c2",
            descripcion: "Modificando avance"
        },
    });
    
    assert.equal(result.data.EditarAvance, undefined);
});