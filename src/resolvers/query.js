import { getUserLogin } from '../utils';
import * as Sequelize from "sequelize";

const Op = Sequelize.Op;
/*
    This will be mainly to get drs details
 */
function doctor(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Doctor.findOne({
        where: {
            login: {
                [Op.eq]: myLogin
            }
        }
    });
}

/*
    This will be almost public. Anyone with an account has access to it, R/W
    Typically, patient registration is done by a PA or secretary
    We just have to restrict access to sensitive information, like the consultation data
    Payments should be public R/W as well because the PA or secretary takes the payment and
    registers it
  */
function patient(root, args, context, info) {
    getUserLogin(context);
    return context.db.Patient.findAll({
        where: {
            name: {
                [Op.like]: "%"+args.name+"%"
            }
        }
    });
}

/*
    This is probably the only sensitive data in here
    Anyone with a drs registration number (CRM in Brazil) can
    access their own consultation's data. Other drs can NOT see
    another's data.
 */
async function consultation(root, args, context, info) {
    const myLogin = getUserLogin(context);
    const user = await context.db.Doctor.findOne({ where: { login: { [Op.eq]: myLogin } } });
    if (user.register<0) throw new Error('Not a registered Doctor');
    return context.db.Consultation.findAll({
        where: {
            login: {[Op.eq]: myLogin},
        },
        include: [{
            model: context.db.Patient,
            where: {
                name: {[Op.like]: "%"+args.name+"%"}
            }
        }]
    });
}

async function docType(root, args, context, info) {
    const myLogin = getUserLogin(context);
    const user = await context.db.Doctor.findOne({ where: { login: { [Op.eq]: myLogin } } });
    if (user.register<0) throw new Error('Not a registered Doctor');
    if (args.name) {
        return context.db.DocType.findAll({
            where: {
                login: myLogin,
                name: {[Op.like]: "%"+args.name+"%"},
            }
        });
    } else {
        return context.db.DocType.findAll({
            where: {
                login: myLogin
            }
        });
    }
}

async function payment(root, args, context, info) {
    const myLogin = getUserLogin(context);
    const user = await context.db.Doctor.findOne({ where: { login: { [Op.eq]: myLogin } } });
    if (user.register<0) throw new Error('Not a registered Doctor');
    if (args.name && args.date) {
        return context.db.Payment.findAll({
            where: {
                login: {[Op.eq]: myLogin},
                date: {[Op.eq]: args.date}
            },
            include: [{
                model: context.db.Patient,
                where: {
                    name: {[Op.like]: "%"+args.name+"%"}
                }
            }]
        });
    }
    if (args.name) {
        return context.db.Payment.findAll({
            where: {
                login: {[Op.eq]: myLogin},
            },
            include: [{
                model: context.db.Patient,
                where: {
                    name: {[Op.like]: "%"+args.name+"%"}
                }
           }]
        });
    }
    if (args.date) {
        return context.db.Payment.findAll({
            where: {
                login: {[Op.eq]: myLogin},
                date: {[Op.eq]: args.date}
            }
        });
    }
}

async function insuranceProvider(root, args, context, info) {
    const myLogin = getUserLogin(context);
    const user = await context.db.Doctor.findOne({ where: { login: { [Op.eq]: myLogin } } });
    if (user.register<0) throw new Error('Not a registered Doctor');
    return context.db.InsuranceProvider.findAll({
        where: {
            name: { [Op.like]: args.name }
        }
    });
}

module.exports = {
    doctor,
    patient,
    consultation,
    docType,
    payment,
    insuranceProvider
};