import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './../resolvers/resolversMap';

const schema = makeExecutableSchema ({
    typeDefs,
    resolvers
})


export default schema;