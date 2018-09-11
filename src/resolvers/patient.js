function consultation(root, args, context, info) {
    if (args.login) {
        return context.db.Consultation.findAll({
            where: {
                id: root.id,
                login: args.login
            }
        });
    } else {
        return context.db.Consultation.findAll({
            where: {
                id: root.id
            }
        });
    }
}

function payment(root, args, context, info) {
    if (args.login) {
        return context.db.Payment.findAll({
            where: {
                id: root.id,
                login: args.login
            }
        });
    } else {
        return context.db.Payment.findAll({
            where: {
                id: root.id
            }
        });
    }
}

module.exports = {
    consultation,
    payment
}