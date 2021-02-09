import {AuthenticationError, ApolloError} from 'apollo-server-express';

const mutation = {
    Mutation : {
        createUser: async (_, {user}, {dataSources}) => {
            const response = await dataSources.tutoriasApi.createUser(user);
            if(!response.message){
                return response
            }
            else {
                throw new Error(response.message);
                 
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
        },
        changePassword: async(_,{email, password, newPassword}, {dataSources}) => {
            const response = await dataSources.tutoriasApi.changePassword(email, password, newPassword)
            if(response) {
                return response;
            }else {
                throw new ApolloError(response.message, 400);
            }
        }

    }
    
}

export default mutation;