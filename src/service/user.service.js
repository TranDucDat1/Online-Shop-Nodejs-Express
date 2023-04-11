const User = require('../models/user.model');

exports.findUser = async (id) => await User.findById(id).lean();  