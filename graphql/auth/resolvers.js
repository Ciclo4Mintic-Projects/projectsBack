const resolversAutenticacion = {
    Mutation:{
        registro: async(parent, args) => {
            console.log('Crear usuario', args);
            return 'usuario creado';
        },
    },
};

export { resolversAutenticacion };