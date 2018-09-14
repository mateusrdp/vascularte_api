import jwt from 'jsonwebtoken';
const APP_SECRET = process.env.APP_SECRET;

function getUserLogin(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }
    throw new Error('Not authenticated');
}

function getGodMode(context) {
    const godMode = context.request.get('X-GodMode');
    console.log("=============");
    console.log(godMode);
    if (godMode) {
        const token = godMode.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId === "__god__";
    }
    throw new Error('GodMode off')
}

module.exports = {
    APP_SECRET,
    getUserLogin,
    getGodMode,
}