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
        }
    }
}

export default query;