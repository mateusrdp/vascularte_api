import { GraphQLObjectType,GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLSchema } from 'graphql';
import Db from './db';

const Doctor = new GraphQLObjectType({
    name: 'Doctor',
    description: 'This is a doctor',
    fields: () => {
        return {
            login: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.login;
                }
            },
            password: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.password;
                }
            },
            identityDocument: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.identityDocument;
                }
            },
            register: {
                type: GraphQLInt,
                resolve(doctor) {
                    return doctor.register;
                }
            },
            address: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.address;
                }
            },
            gender: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.gender;
                }
            },
            name: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.name;
                }
            },
            phone: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.phone;
                }
            },
            city: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.city;
                }
            },
            state: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.state;
                }
            },
            specialty: {
                type: GraphQLString,
                resolve(doctor) {
                    return doctor.specialty;
                }
            },
            consultations: {
                type: new GraphQLList(Consultation),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(doctor, args) {
                    return doctor.getConsultations({where:args} );
                }
            },
            docTypes: {
                type: new GraphQLList(DocType),
                resolve(doctor) {
                    return doctor.getDocTypes();
                }
            },
        }
    }
});

const DocType = new GraphQLObjectType({
    name: 'DocType',
    description: 'This is a type of document',
    fields: () => {
        return {
           login: {
                type: GraphQLString,
                resolve(docType) {
                    return docType.login;
                }
            },
            name: {
                type: GraphQLString,
                resolve(docType) {
                    return docType.name;
                }
            },
            content: {
                type: GraphQLString,
                resolve(docType) {
                    return docType.content;
                }
            },
        }
    }
});

const InsuranceProvider = new GraphQLObjectType({
    name: 'InsuranceProvider',
    description: 'This is an insurance provider',
    fields: () => {
        return {
            name: {
                type: GraphQLString,
                resolve(insuranceProvider) {
                    return insuranceProvider.name;
                }
            },
            amountCharged: {
                type: GraphQLString,
                resolve(insuranceProvider) {
                    return insuranceProvider.amountCharged;
                }
            },
        }
    }
});

const Payment = new GraphQLObjectType({
    name: 'Payment',
    description: 'This is a payment',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(payment) {
                    return payment.id;
                }
            },
            login: {
                type: GraphQLString,
                resolve(payment) {
                    return payment.login;
                }
            },
            date: {
                type: GraphQLString,
                resolve(payment) {
                    return payment.date;
                }
            },
            insuranceProvider: {
                type: GraphQLString,
                resolve(payment) {
                    return payment.insuranceProviderName;
                }
            },
            amountCharged: {
                type: GraphQLFloat,
                resolve(payment) {
                    return payment.amountCharged;
                }
            },
            receipt: {
                type: GraphQLString,
                resolve(payment) {
                    return payment.receipt;
                }
            },
        }
    }
});

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
            civilStatus: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.civilStatus;
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
            naturalFrom: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.naturalFrom;
                }
            },
            origin: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.origin;
                }
            },
            referredBy: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.referredBy;
                }
            },
            obs: {
                type: GraphQLString,
                resolve(patient) { //Patient comes from the object definition in db.js
                    return patient.obs;
                }
            },
            consultation: {
                type: Consultation,
                resolve(patient) {
                    return patient.getConsultation();
                }
            },
            payments: {
                type: new GraphQLList(Payment),
                resolve(patient) {
                    return patient.getPayments();
                }
            }
        }
    }
});

const Consultation = new GraphQLObjectType({
    name: 'Consultation',
    description: 'This is a patient consultation',
    fields: () => {
        return {
            patient: {
                type: Patient,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.getPatient();
                }
            },
            login: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.login;
                }
            },
            anamnesis: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.anamnesis;
                }
            },
            physical: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.physical;
                }
            },
            hypothesis: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.hypothesis;
                }
            },
            conduct: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.conduct;
                }
            },
            evolution: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.evolution;
                }
            },
            examination: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.examination;
                }
            },
            surgicalProcedures: {
                type: GraphQLString,
                resolve(consultation) { //Patient comes from the object definition in db.js
                    return consultation.surgicalProcedures;
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
           doctor: {
               type: new GraphQLList(Doctor),
               args: {
                   login: {
                       type: GraphQLString
                   }
               },
               resolve(root, args) {
                   return Db.models.doctor.findAll({where:args});
               }
           },
       }
   }
});

const Schema = new GraphQLSchema({
   query: Query
});

export default Schema;