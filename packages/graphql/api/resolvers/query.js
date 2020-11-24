import {ApolloError} from 'apollo-server-express';

const query = {
    Query: {
        getUsers : (_,__, {dataSources}) => {
            const response = dataSources.tutoriasApi.getUsers();
            if(response){
                return response;
            }            
            return [{
                _id: -1,
                userName: 'No se han encontrado usuarios',
                email: "",
                token: "No se han encontrado usuarios",
                createdAT: "",
                updatedAt: ""
            }]
        },
        getAsignaturas : (_,__, {dataSources}) => {
            const response = dataSources.tutoriasApi.getAsignaturas();
            if(response){
                return response;
            }            
            return [{
                _id: -1,
                tema: ['No se han encontrado temas'],
                Asignatura: "No se han encontrado asignatura"
            }]
        },

        verificationToken: (_,{token},{dataSources}) => {
            const response = dataSources.tutoriasApi.validateVerificationToken(token)
            console.log(response)
            if(!response.message){
                return response;
            }else {
                throw new ApolloError(response.message, 400);
            }
        
        },
        resetPassword: (_,{email},{dataSources}) => {
            const response = dataSources.tutoriasApi.resetPassword(email)
            if(response){
                return response;
            }else {
                throw new ApolloError(response.message, 400);
            }      
        },
        validateToken:(_,{token}, {dataSources}) => {
            const response = dataSources.tutoriasApi.validateToken(token)
            if(response){
                return response;
            }else {
                throw new ApolloError(response.message, 400);
            }
        }
    }
}

export default query;