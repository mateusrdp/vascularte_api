import bcrypt from  'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserLogin, getGodMode } from '../utils';
import * as Sequelize from "sequelize";

const Op = Sequelize.Op;

async function signIn(root, args, context, info) {
    const user = await context.db.Doctor.findById(args.login);
    if (!user) throw new Error('No such user found')
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error('Wrong password');
    const token = jwt.sign({userId: user.login}, APP_SECRET);
    return { token, user };
}

async function godMode(root, args, context, info) {
    const token = await context.db.myDBConnection.query("SELECT masterPassword FROM AppSettings").spread(async (results, metadata)=>{
        const valid = await bcrypt.compare(args.password, results[0].masterPassword);
        if (!valid) throw new Error('Wrong master password');
        const token = jwt.sign({ userId: "__god__"}, APP_SECRET);
        return token;
    });
    return token;
}

async function setMasterPassword(root, args, context, info) {
    const result = context.db.myDBConnection.query("SELECT masterPassword FROM AppSettings")
        .spread( async (results, metadata)=>{
            if (!results.length && args.password) {
                const myPassword = await bcrypt.hash(args.password, 10); // TODO: What's 10?
                context.db.myDBConnection.query(
                    "INSERT INTO AppSettings(masterPassword) VALUES ('" + myPassword + "')"
                ).spread((results, metadata)=>{return true;});
            } else {
                throw new Error('Master password is already set. ' +
                    'Contact the system administrator if you wanna reset it.');
            }
            return true;
        });
    return result;
}

/*
    Doctor CRUD
 */
async function addDoctor(root, args, context, info) {
    const godMode = getGodMode(context);
    // const login = getUserLogin(context);
    const passwd = await bcrypt.hash(args.password, 10); // TODO: What's 10?
    const user = await context.db.Doctor.create({
        login: args.login,
        password: passwd,
        identityDocument: args.identityDocument,
        register: args.register,
        address: args.address,
        gender: args.gender,
        name: args.name,
        phone: args.phone,
        city: args.city,
        state: args.state,
        specialty: args.specialty,
    });
    const token = jwt.sign({ userId: user.login}, APP_SECRET);
    return { token, user };
}

function removeDoctor(root, args, context, info) {
    const login = getUserLogin(context);
    return context.db.Doctor.findById(login).then(doctor => {
        return doctor.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateDoctor(root, args, context, info) {
    const login = getUserLogin(context);
    return context.db.Doctor.findById(login).then(
        doctor => {
            if (doctor) {
                // Stupid bug forces me to change the name everytime or else it violates nonnull on it!
                // See updatePatient() for the cleaner solution, that doesn't work
                if (args.password) doctor.password = args.password;
                if (args.identityDocument) doctor.identityDocument = args.identityDocument;
                if (args.register) doctor.register = args.register;
                if (args.address) doctor.address = args.address;
                if (args.gender) doctor.gender = args.gender;
                if (args.name) doctor.name = args.name;
                if (args.phone) doctor.phone = args.phone;
                if (args.city) doctor.city = args.city;
                if (args.state) doctor.state = args.state;
                if (args.specialty) doctor.specialty = args.specialty;
                return doctor.save();
            }
        }
    ).catch(error => { return {Error: error}; });
}

/*
    Patient CRUD
 */

function addPatient(root, args, context, info) {
    getUserLogin(context);
    return context.db.Patient.create({
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

function updatePatient(root, args, context, info) {
    getUserLogin(context);
    return context.db.Patient.findById(args.id).then(
        patient => {
            if (patient) {
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
    ).catch(error => { return {Error: error}; });
}

function removePatient(root, args, context, info) {
    getUserLogin(context);
    getGodMode(context);
    return context.db.Patient.findById(args.id).then(patient => {
        return patient.destroy();
    }).catch(error => { return {Error: error}; });
}

/*
    Consultation CRUD
 */
function addConsultation(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Consultation.create({
        id: args.id,
        login: myLogin,
        anamnesis: args.anamnesis,
        physical: args.physical,
        hypothesis: args.hypothesis,
        conduct: args.conduct,
        evolution: args.evolution,
        examination: args.examination,
        surgicalProcedures: args.surgicalProcedures
    });
}

function removeConsultation(root, args, context, info) {
    const myLogin = getUserLogin(context);
    getGodMode(context);
    return context.db.Consultation.findOne({
        where: {
            login: { [Op.eq]: myLogin },
            id: { [Op.eq]: args.id }
        }
    }).then(consultation => {
        return consultation.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateConsultation(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Consultation.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            id: {[Op.eq]: args.id}
        }
    }).then(consultation => {
        if (args.anamnesis) consultation.anamnesis = args.anamnesis;
        if (args.physical) consultation.physical = args.physical;
        if (args.hypothesis) consultation.hypothesis = args.hypothesis;
        if (args.conduct) consultation.conduct = args.conduct;
        if (args.evolution) consultation.evolution = args.evolution;
        if (args.examination) consultation.examination = args.examination;
        if (args.surgicalProcedures) consultation.surgicalProcedures = args.surgicalProcedures;
        return consultation.save();
    }).catch(error => { return {Error: error}; });
}

/*
    InsuranceProvider CRUD
 */
function addInsuranceProvider(root, args, context, info) {
    getUserLogin(context);
    return context.db.InsuranceProvider.create({
        name: args.name,
        amountCharged: args.amountCharged
    });
}

function removeInsuranceProvider(root, args, context, info) {
    getUserLogin(context);
    return context.db.InsuranceProvider.findOne({where:args}).then(insuranceProvider => {
        return insuranceProvider.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateInsuranceProvider(root, args, context, info) {
    getUserLogin(context);
    return context.db.InsuranceProvider.findOne({
        where: {
            name: {[Op.eq]: args.name}
        }
    }).then(insuranceProvider => {
        if (args.amountCharged) insuranceProvider.amountCharged = args.amountCharged;
        return insuranceProvider.save();
    }).catch(error => { return {Error: error}; });
}

/*
    Payment CRUD
 */
function addPayment(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Payment.create({
        id: args.id,
        login: myLogin,
        date: args.date,
        insuranceProviderName: args.insuranceProviderName,
        amountCharged: args.amountCharged,
        receipt: args.receipt
    });
}

function removePayment(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Payment.findOne({
        where: {
            id: {[Op.eq]: args.id},
            login: {[Op.eq]: myLogin},
            date: {[Op.eq]: args.date}
        }
    }).then(payment => {
        return payment.destroy();
    }).catch(error => { return {Error: error}; });
}

function updatePayment(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Payment.findOne({
        where: {
            id: {[Op.eq]: args.id},
            login: {[Op.eq]: myLogin},
            date: {[Op.eq]: args.date}
        }
    }).then(
        payment => {
            if (payment) {
                if (args.date) payment.date = args.date;
                if (args.insuranceProviderName) payment.insuranceProviderName = args.insuranceProviderName;
                if (args.amountCharged) payment.amountCharged = args.amountCharged;
                if (args.receipt) payment.receipt = args.receipt;
                return payment.save();
            }
        }
    ).catch(error => { return {Error: error}; });
}

/*
    DocType CRUD
 */
function addDocType(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.create({
        login: myLogin,
        name: args.name,
        content: args.content
    });
}

function removeDocType(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            name: {[Op.eq]: args.name}
        }
    }).then(docType => {
        return docType.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateDocType(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            name: {[Op.eq]: args.name}
        }
    }).then(docType => {
        if (docType) {
            if (args.name) docType.name = args.name;
            if (args.content) docType.content = args.content;
            return docType.save();
        }
    }).catch(error => { return {Error: error}; });
}

// EXPORTS
module.exports = {
    signIn,
    godMode,
    setMasterPassword,

    addDoctor,
    removeDoctor,
    updateDoctor,

    addPatient,
    removePatient,
    updatePatient,

    addConsultation,
    removeConsultation,
    updateConsultation,

    addDocType,
    removeDocType,
    updateDocType,

    addPayment,
    removePayment,
    updatePayment,

    addInsuranceProvider,
    removeInsuranceProvider,
    updateInsuranceProvider
};