function patient(root, args, context, info) {
    return context.db.Patient.findById(root.id);
}

function doctor(root, args, context, info) {
    return context.db.Doctor.findOne({
        where: { login: root.login }
    });
}

module.exports = {
    patient,
    doctor
}