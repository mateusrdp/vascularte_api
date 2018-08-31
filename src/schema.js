/**
 * TODO: Implement super users (i.e.: admin - can add Drs)
 * TODO: Restrict information retrieved by restricted users
 * TODO: Restrict mutations allowed by normal users (i.e.: no managing users / setting up system)
 * TODO: modularise all this per abstraction (too much code in just one js!)
 */

import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';
import Db from './db';
import * as Sequelize from "sequelize";

const Op = Sequelize.Op;

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
                    id: { type: GraphQLInt },
                    name: { type: GraphQLString }
                },
                resolve(doctor, args) {
                    if (args.id) return doctor.getConsultations({where:args});
                    else return doctor.getConsultations({
                        include: [{
                            model: Patient,
                            where: {
                                name: {
                                    [Op.like]: args.name
                                }
                            }
                        }]
                    })
                }
            },
            docTypes: {
                type: new GraphQLList(DocType),
                resolve(doctor) {
                    return doctor.getDocTypes();
                }
            },
            payments: {
                type: new GraphQLList(Payment),
                args: {
                    insuranceProviderName: { type: GraphQLString }
                },
                resolve(doctor, args) {
                    return doctor.getPayments({where:args});
                }
            }
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
                type: GraphQLFloat,
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
                type: GraphQLFloat,
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

// Queries
const Query = new GraphQLObjectType({
   name: 'Queries',
   description: 'Queries publicly available. Implement the R(ead) of CRUD.',
   fields: () => {
       return {
           doctor: {
               type: Doctor,
               args: {
                   login: { type: new GraphQLNonNull(GraphQLString) }
               },
               resolve(root, args) {
                   return Db.models.doctor.findOne({where:args});
               }
           },
           patient: {
               type: new GraphQLList(Patient),
               args: {
                   name: { type: GraphQLString}
               },
               resolve(root, args) {
                   if (args.name) {
                       return Db.models.patient.findAll({
                           where: {
                               name: {
                                   [Op.like]: '%' + args.name + '%'
                               },
                           }
                       });
                   } else return Db.models.patient.findAll();
               }
           },
       }
   }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Mutations publicly available. Implement the [C(reate),U(pdate),D(elete)] bits of CRUD.',
    fields () {
        return {
            addDoctor: {
                type: Doctor,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    password: {type: new GraphQLNonNull(GraphQLString)},
                    identifyDocument: {type: new GraphQLNonNull(GraphQLString)},
                    register: {type: GraphQLInt},
                    address: {type: GraphQLString},
                    gender: {type: GraphQLString},
                    name: {type: GraphQLString},
                    phone: {type: GraphQLString},
                    city: {type: GraphQLString},
                    state: {type: GraphQLString},
                    specialty: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.doctor.create({
                        login: args.login,
                        password: args.password,
                        identifyDocument: args.identifyDocument,
                        register: args.register,
                        address: args.address,
                        gender: args.gender,
                        name: args.name,
                        phone: args.phone,
                        city: args.city,
                        state: args.state,
                        specialty: args.specialty,
                    });
                }
            },
            updateDoctor: {
                type: Doctor,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    password: {type: GraphQLString},
                    identifyDocument: {type: GraphQLString},
                    register: {type: GraphQLInt},
                    address: {type: GraphQLString},
                    gender: {type: GraphQLString},
                    name: {type: GraphQLString},
                    phone: {type: GraphQLString},
                    city: {type: GraphQLString},
                    state: {type: GraphQLString},
                    specialty: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.doctor.findById(args.id).then(
                        doctor => {
                            if (doctor) {
                                // Stupid bug forces me to change the name everytime or else it violates nonnull on it!
                                // See updatePatient() for the cleaner solution, that doesn't work
                                if (args.password) doctor.password = args.password;
                                if (args.identifyDocument) doctor.identifyDocument = args.identifyDocument;
                                if (args.register) doctor.register = args.register;
                                if (args.address) doctor.address = args.address;
                                if (args.gender) doctor.gender = args.gender;
                                if (args.name) doctor.name = args.name;
                                if (args.phone) doctor.phone = args.phone;
                                if (args.city) doctor.city = args.city;
                                if (args.state) doctor.state = args.state;
                                if (args.specialty) doctor.special = args.specialty;

                                return doctor.save();
                            }
                        }
                    ).catch(error => {
                        return {Error: error};
                    });
                }
            },
            removeDoctor: {
                type: Doctor,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve(root, args) {
                    return Db.models.doctor.findById(args.login).then(doctor => {
                        return doctor.destroy();
                    }).catch(error => {
                        return {Error: error};
                    });
                }
            },
            addPatient: {
                type: Patient,
                args: {
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    dob: {type: new GraphQLNonNull(GraphQLString)},
                    gender: {type: new GraphQLNonNull(GraphQLString)},
                    ethnicity: {type: GraphQLString},
                    civilStatus: {type: GraphQLString},
                    phone: {type: GraphQLString},
                    address: {type: GraphQLString},
                    profession: {type: GraphQLString},
                    naturalFrom: {type: GraphQLString},
                    origin: {type: GraphQLString},
                    referredBy: {type: GraphQLString},
                    obs: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.patient.create({
                        id: args.id,
                        name: args.name,
                        dob: args.dob,
                        gender: args.gender,
                        ethnicity: args.ethnicity,
                        civilStatus: args.civilStatus,
                        phone: args.phone,
                        address: args.address,
                        profession: args.profession,
                        naturalFrom: args.naturalFrom,
                        origin: args.origin,
                        referredBy: args.referredBy,
                        obs: args.obs,
                    });
                }
            },
            updatePatient: {
                type: Patient,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)},
                    name: {type: GraphQLString},
                    dob: {type: GraphQLString},
                    gender: {type: GraphQLString},
                    ethnicity: {type: GraphQLString},
                    civilStatus: {type: GraphQLString},
                    phone: {type: GraphQLString},
                    address: {type: GraphQLString},
                    profession: {type: GraphQLString},
                    naturalFrom: {type: GraphQLString},
                    origin: {type: GraphQLString},
                    referredBy: {type: GraphQLString},
                    obs: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.patient.findById(args.id).then(
                        patient => {
                            if (patient) {
                                /* //Stupid bug forces me to change the name everytime or else it violates nonnull on it!
                                patient.update({
                                    name: args.name,
                                    dob: args.dob,
                                    gender: args.gender,
                                    ethnicity: args.ethnicity,
                                    civilStatus: args.civilStatus,
                                    phone: args.phone,
                                    address: args.address,
                                    profession: args.profession,
                                    naturalFrom: args.naturalFrom,
                                    origin: args.origin,
                                    referredBy: args.referredBy,
                                    obs: args.obs,
                                })*/
                                //Bugfix
                                if (args.name) patient.name = args.name;
                                if (args.dob) patient.dob = args.dob;
                                if (args.gender) patient.gender = args.gender;
                                if (args.ethnicity) patient.ethnicity = args.ethnicity;
                                if (args.civilStatus) patient.civilStatus = args.civilStatus;
                                if (args.phone) patient.phone = args.phone;
                                if (args.address) patient.address = args.address;
                                if (args.profession) patient.profession = args.profession;
                                if (args.naturalFrom) patient.naturalFrom = args.naturalFrom;
                                if (args.origin) patient.origin = args.origin;
                                if (args.referredBy) patient.referredBy = args.referredBy;
                                if (args.obs) patient.obs = args.obs;

                                return patient.save(); //.then(patient => { return patient; } );
                            }
                        }
                    ).catch(error => {
                        return {Error: error};
                    });
                }
            },
            removePatient: {
                type: Patient,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)},
                },
                resolve(root, args) {
                    return Db.models.patient.findById(args.id).then(patient => {
                        return patient.destroy();
                    }).catch(error => {
                        return {Error: error};
                    });
                }
            },
            addPayment: {
                type: Payment,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    date: {type: new GraphQLNonNull(GraphQLString)},
                    insuranceProvider: {type: new GraphQLNonNull(GraphQLString)},
                    amountCharged: {type: new GraphQLNonNull(GraphQLFloat)},
                    receipt: {type: new GraphQLNonNull(GraphQLFloat)},
                },
                resolve(root, args) {
                    return Db.models.payments.create({
                        login:args.login,
                        date:args.date,
                        insuranceProvider:args.insuranceProvider,
                        amountCharged:args.amountCharged,
                        receipt: args.receipt
                    });
                }
            },
            updatePayment: {
                type: Payment,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)},
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    date: {type: GraphQLString},
                    insuranceProvider: {type: GraphQLString},
                    amountCharged: {type: GraphQLFloat},
                    receipt: {type: GraphQLFloat},
                },
                resolve(root, args) {
                    return Db.models.payment.findById(args.id).then(
                        payment => {
                            if (payment) {
                                if (args.date) payment.date = args.date;
                                if (args.insuranceProvider) payment.insuranceProvider = args.insuranceProvider;
                                if (args.amountCharged) payment.amountCharged = args.amountCharged;
                                if (args.receipt) payment.receipt = args.receipt;
                                return payment.save();
                            }
                        }
                    ).catch(error => {
                        return {Error: error};
                    });
                }
            },
            removePayment: {
                type: Payment,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)},
                },
                resolve(root, args) {
                    return Db.models.payment.findById(args.id).then(payment => {
                        return payment.destroy();
                    }).catch(error => {
                        return {Error: error};
                    });
                }
            },
            addDocType: {
                type: DocType,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    content: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.docType.create({
                        login: args.login,
                        name: args.name,
                        content: args.name
                    });
                }
            },
            updateDocType: {
                type: DocType,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    content: {type: GraphQLString},
                },
                resolve(root, args) {
                    return Db.models.docType.findOne({where:args}).then(
                        docType => {
                            if (docType) {
                                if (args.name) docType.name = args.name;
                                if (args.content) docType.content = args.content;
                                return docType.save();
                            }
                        }
                    ).catch(error => {
                        return {Error: error};
                    });
                }
            },
            removeDocType: {
                type: DocType,
                args: {
                    login: {type: new GraphQLNonNull(GraphQLString)},
                    name: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve(root, args) {
                    return Db.models.docType.findOne({where:args}).then(docType => {
                        return docType.destroy();
                    }).catch(error => {
                        return {Error: error};
                    });
                }
            },
            addInsuranceProvider: {
                type: InsuranceProvider,
                args: {
                    name: {type: GraphQLNonNull(GraphQLString)},
                    amountCharged: {type: GraphQLFloat}
                },
                resolve(root, args) {
                    return Db.models.insuranceProvider.create({
                        name: args.name,
                        amountCharged: args.amountCharged
                    });
                }
            },
            updateInsuranceProvider: {
                type: InsuranceProvider,
                args: {
                    name: {type: GraphQLNonNull(GraphQLString)},
                    amountCharged: {type: GraphQLFloat}
                },
                resolve(root, args) {
                    return Db.models.insuranceProvider.findOne({where:args}).then(
                        insuranceProvider => {
                            if (insuranceProvider) {
                                if (args.amountCharged) insuranceProvider.amountCharged = args.amountCharged;
                                return insuranceProvider.save();
                            }
                        }
                    ).catch(error => {
                            return {Error: error};
                    });
                }
            },
            removeInsuranceProvider: {
                type: InsuranceProvider,
                args: {
                    name: {type: GraphQLNonNull(GraphQLString)}
                },
                resolve(root, args) {
                    return Db.models.insuranceProvider.findOne({where:args}).then(insuranceProvider => {
                        return insuranceProvider.destroy();
                    }).catch(error => {
                        return {Error: error};
                    });
                }
            },
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;