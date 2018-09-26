const newPatient = {
    subscribe: (root, args, context, info) => {
        return context.pubsub.asyncIterator("NEW_PATIENT");
    }
}

const delPatient = {
    subscribe: (root, args, context, info) => {
        return context.pubsub.asyncIterator("DEL_PATIENT");
    }
}

module.exports = {
    newPatient,
    delPatient
}