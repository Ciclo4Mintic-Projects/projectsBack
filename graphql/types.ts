import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/tipos';
import { tiposProyecto } from '../models/proyecto/tipos';
import { tiposUsuario } from '../models/usuario/tipos';
import { tiposInscripcion } from '../models/inscripcion/tipos';
import { tiposAvance } from '../models/avance/tipos';

const tiposGlobales = gql`
  scalar Date  
`;

export const tipos = [tiposGlobales, tiposEnums, tiposProyecto, tiposUsuario, tiposInscripcion, tiposAvance];
  