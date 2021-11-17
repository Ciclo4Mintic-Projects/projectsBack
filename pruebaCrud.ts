import conectarBD from './db/db';
import { UserModel } from './models/usuario/usuario';
import { ProyectoModel } from './models/proyecto/proyecto';
import { InscripcionModel } from './models/inscripcion/inscripcion';
import { AvanceModel } from './models/avance/avances';
import { Enum_EstadoUsuario, Enum_Rol } from './models/enums/enums';

const main = async () => {
  await conectarBD();

  //CREAR UN USUARIO
  // await UserModel.create({
  //   apellido: 'Cano',
  //   correo: 'tc@cc.com',
  //   identificacion: '12323467',
  //   nombre: 'Thomas',
  //   rol: Enum_Rol.estudiante,
  // })
  //   .then((u) => {
  //     console.log('usuario creado', u);
  //   })
  //   .catch((e) => {
  //     console.error('Error creando el usuario', e);
  //   });

  // OBTENER LOS USUARIOS
  // await UserModel.find()
  //   .then((u) => {
  //     console.log('usuarios', u);
  //   })
  //   .catch((e) => {
  //     console.error('error obteniendo los usuarios', e);
  //   });

  // Crear Proyecto
  // await ProyectoModel.create({
  //   nombre: 'Proyecto 1',
  //   //   objetivos: objetivo;
  //   presupuesto: '100000',
  //   objetivoGeneral: 'Objetivo general 1',
  //   objetivoEspecifico :'Objetivo especifico 1',
  //   fechaInicio: Date.now(),
  //   fechaFin: Date.now(),
  //   lider: '618aec90d4f0815349a45f01',
  // })
  //   .then((u) => {
  //     console.log('usuario creado', u);
  //   })
  //   .catch((e) => {
  //     console.error('Error creando el usuario', e);
  //   });

  //Crear Inscripcion
  // await InscripcionModel.create({
  //   proyecto: '618c3c8021d424c0855567cf',
  //   estudiante: '618c3a97dca7937bb14aba4c',
  //   fechaIngreso: Date.now(),
  // })
  //   .then((u) => {
  //     console.log('usuario creado', u);
  //   })
  //   .catch((e) => {
  //     console.error('Error creando el usuario', e);
  //   });

    //Crear Avance
    await AvanceModel.create({
      proyecto: '618c3c8021d424c0855567cf',
      fecha: Date.now(),
      descripcion: 'Avance 2',
      creadoPor: '618c3a97dca7937bb14aba4c',
    })
      .then((u) => {
        console.log('usuario creado', u);
      })
      .catch((e) => {
        console.error('Error creando el usuario', e);
      });
};

main();
