const USER = require('../models/user.model');

async function getUsers(req, res ) {
    const user = await USER.findOne({ _id: req.params.id }).lean();
    console.log('user', req.params.id);
    res.status(200).json(user);
}

async function getUsers2(req, res ) {
    const user = await USER.findOne({ _id: req.params.id }).lean();
    console.log('user', req.params.id);
    res.status(200).json(user);
}


module.exports.getUsers = getUsers
module.exports.getUsers2 = getUsers2