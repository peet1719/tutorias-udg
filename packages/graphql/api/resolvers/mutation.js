import {AuthenticationError} from 'apollo-server-express';

const mutation = {
    Mutation : {
        createUser: async (_, {user}, {dataSources}) => {
            const response = await dataSources.tutoriasApi.createUser(user);
            if(response){
                return response
            }
            return {
                user: {
                    userName: "No se pudo agregar usuario",
                    email: "",
                    password: ""
                },
                token: "No se pudo agregar al usuario"
                 
            }
        },
        createAsignatura: async (_, {asignatura}, {dataSources}) => {
            const response = await dataSources.tutoriasApi.createAsignatura(asignatura);
            if(response){
                return response
            }
            return {
                asignatura: "No se pudo agregar la asignatura",
                temas: ["No se pudo agregar el tema"]
                 
            }
        },
        login: async (_, {user, password}, {dataSources}) => {
            const response = await dataSources.tutoriasApi.login(user, password);
            if(response) {
                return response;
            }
            throw new AuthenticationError('Email o password incorrectos');
        }

    }
    
}

export default mutation;