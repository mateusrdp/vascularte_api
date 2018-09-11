import {getUserLogin} from "../utils";

function payment(root, args, context, info) {
    const myLogin = getUserLogin(context);
    if (args.name) {
        return context.db.Payment.findAll({
            where: {
                login: {[Op.eq]: myLogin},
                name: {[Op.like]: "%"+args.name+"%"}
            }
        })
    } else {
        return context.db.Payment.findAll({
            where: {
                login: myLogin
            }
        });
    }
}

function docType(root, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.findAll({
        where: {
            login: {[Op.eq]: myLogin},
            name: {[Op.like]: "%"+args.name+"%"}
        }
    });
}

module.exports = {
    payment,
    docType
}