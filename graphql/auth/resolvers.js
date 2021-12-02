import { UsuarioModel } from "../../models/usuario/usuario.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/tokenUtils.js";

const resolversAutenticacion = {
    Mutation: {
        registro: async (parent, args) => {
            try {
                
                if(await UsuarioModel.findOne({correo: args.correo })) {
                    return {
                        error: 'Por favor verifique su correo, el usuario ya existe'
                    }
                };  

                if(args.password !== args.verifypassword){
                    return {
                      error: 'La contraseña y la verificacion no coinciden'
                    }
                  }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.password, salt);
                const usuarioCreado = await UsuarioModel.create({
                    nombre: args.nombre,
                    apellido: args.apellido,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    rol: args.rol,
                    password: hashedPassword,
                });
                return {
                    token:generateToken({
                        _id:usuarioCreado._id,
                        nombre: usuarioCreado.nombre,
                        apellido: usuarioCreado.apellido,
                        identificacion: usuarioCreado.identificacion,
                        correo: usuarioCreado.correo,
                        rol: usuarioCreado.rol,
                        estado: usuarioCreado.estado,
                    }),
                };
            } catch (error) {
                return { error: 'Verifique sus datos por favor'}
            }
        },

        login: async (parent, args) => {
            try {
                const usuarioEncontrado = await UsuarioModel.findOne({ correo: args.correo });
                if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
                    return {
                        token:generateToken({
                            _id:usuarioEncontrado._id,
                            nombre: usuarioEncontrado.nombre,
                            apellido: usuarioEncontrado.apellido,
                            identificacion: usuarioEncontrado.identificacion,
                            correo: usuarioEncontrado.correo,
                            rol: usuarioEncontrado.rol,
                            estado: usuarioEncontrado.estado,
                        }),
                    };
                } else {
                    return {error: 'Correo o contraseña inválidos'} 
                }

            } catch (error) {           
                return {error: 'Correo o contraseña inválidos'}
            }
        },

        refreshToken: async (parent, args, context) => {
            console.log('contexto', context);    
            if(!context.userData){
                return {
                    error: 'token no válido',
                };
            }  
            else {
                return {                    
                    token: generateToken({
                        _id: context.userData._id,
                        nombre: context.userData.nombre,
                        apellido: context.userData.apellido,
                        identificacion: context.userData.identificacion,
                        correo: context.userData.correo,
                        rol: context.userData.rol,
                        estado: context.userData.estado,
                    }),
                }
 
            }       
        }
    },
};

export { resolversAutenticacion };