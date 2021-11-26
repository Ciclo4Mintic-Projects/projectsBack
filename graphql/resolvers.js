import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversUsuario } from "../models/usuario/resolvers.js";
import { resolversAvance } from "../models/avance/resolvers.js";
import { resolversInscripcion } from "../models/inscripcion/resolvers.js";
import { resolversAutenticacion } from "./auth/resolvers.js";

export const resolvers = [resolversProyecto, resolversUsuario, resolversAvance, resolversInscripcion, resolversAutenticacion];