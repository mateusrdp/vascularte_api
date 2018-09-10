import { GraphQLServer } from 'graphql-yoga';

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
// const AuthPayload = require('./resolvers/authPayload');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(()=> console.log('Server running on http://localhost:4000')).catch((error)=>{console.log(error);});