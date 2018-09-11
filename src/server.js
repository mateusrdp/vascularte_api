import { GraphQLServer } from 'graphql-yoga';

import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import AuthPayload from './resolvers/authPayload';

import db from "./db";

/*
import Patient from './resolvers/patient';
import Consultation from './resolvers/consultation';
import DocType from './resolvers/doctype';
import InsuranceProvider from './resolvers/insuranceprovider';
import Payment from './resolvers/payment';
*/

const resolvers = { Query, Mutation, AuthPayload, /*Doctor, Patient, Consultation, DocType, InsuranceProvider, Payment*/ };

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db
    })
});

server.start(()=> console.log('Server running on http://localhost:4000')).catch((error)=>{console.log(error);});