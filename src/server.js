import { GraphQLServer } from 'graphql-yoga';

import db from "./db";

import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import AuthPayload from './resolvers/authPayload';
import Patient from './resolvers/patient';
import Doctor from './resolvers/doctor';
import Consultation from './resolvers/consultation';
import Payment from './resolvers/payment';

const resolvers = { Query, Mutation, AuthPayload, Patient, Doctor, Consultation, Payment};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db
    })
});

server.start(()=> console.log('Server running on http://localhost:4000')).catch((error)=>{console.log(error);});