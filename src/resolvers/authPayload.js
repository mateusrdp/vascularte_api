function user(root, args, context, info) {
    return context.db.Doctor({where: args});
}

module.exports = { user }