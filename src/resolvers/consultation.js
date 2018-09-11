function doctor(root, args, context, info) {
    return context.db.Doctor.findOne({
        where: { login: root.login }
    });
}

module.exports = {
    doctor
}