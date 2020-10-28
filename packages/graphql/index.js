import './db/mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './api/schema';
import DataTutorias from './api/datasources/DataTutorias';
import User from './models/user';
import jwt from 'jsonwebtoken';


const server = new ApolloServer({
    schema,
    dataSources: () => ({
        tutoriasApi: new DataTutorias()
    }),
    context: async ({req}) => {
        const token = req.headers.authorization || "";
        if(!token) return null;
        
        const decode = jwt.verify(token, 'secretkeyChange', function(err, decode){
            if(err){ return false }
        });
        
        return decode;
    }
});

export default server;

