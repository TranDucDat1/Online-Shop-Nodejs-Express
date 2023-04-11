const USER = require('../model/user.model');

exports.getUsers = async (req, res ) => {
    const user = await USER.findOne({ _id: '6433d9accff4196fa3bbe882' }).lean();
    console.log('user', user.name);
    res.status(200).json(user);
}