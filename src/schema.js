import { GraphQLObjectType,GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } from 'graphql';
import Db from './db';
import Sequelize from "sequelize";

const Patient = new GraphQLObjectType({
    name: 'Patient',
    description: 'This is a patient',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.name;
                }
            },
            dob: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.dob;
                }
            },
            gender: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.gender;
                }
            },
            ethnicity: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.ethnicity;
                }
            },
            civil_status: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.civil_status;
                }
            },
            phone: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.phone;
                }
            },
            profession: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.profession;
                }
            },
            address: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.address;
                }
            },
            natural_from: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.natural_from;
                }
            },
            origin: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.origin;
                }
            },
            referred_by: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.referred_by;
                }
            },
            obs: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.obs;
                }
            },
        }
    }
});

const Consultation = new GraphQLObjectType({
    name: 'Consultation',
    description: 'This is a patient consultation',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            login: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            anamnesis: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            physical: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            hypothesis: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            conduct: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            evolution: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            examination: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
            surgical_procedures: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.obs;
                }
            },
        }
    }
});

const Query = new GraphQLObjectType({
   name: 'Query',
   description: 'This is a root query',
   fields: () => {
       return {
           patients: {
               type: new GraphQLList(Patient),
               args: {
                   id: {
                       type: GraphQLInt
                   },
               },
               resolve(root, args) {
                   return Db.models.patient.findAll({where: args});
               }
           }
       }
   }
});

const Schema = new GraphQLSchema({
   query: Query
});

export default Schema;