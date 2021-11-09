import { connect } from 'mongoose';
// const { connect } = require('mongoose');

const conectarBD = async () => {
  return await connect(
    'mongodb+srv://admin:supremacy@cluster0.x9cqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBD;
