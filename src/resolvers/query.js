import { getUserLogin } from '../utils';
import * as Sequelize from "sequelize";

const Op = Sequelize.Op;

function doctor(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Doctor.findOne({
        where: {
            login: {
                [Op.eq]: myLogin
            }
        }
    });
}

function patient(parent, args, context, info) {
    return context.db.Patient.findOne({
        where: {
            name: {
                [Op.like]: "%"+args.name+"%"
            }
        }
    });
}

module.exports = {
    doctor,
    patient
};