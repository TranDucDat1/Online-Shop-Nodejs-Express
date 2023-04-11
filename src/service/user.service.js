const User = require('../models/user.model');

exports.findUserById = async (id) => await User.findById(id).lean();

exports.findUserByPhone = async (phoneNumber) => await User.findOne({ phone: phoneNumber }).exec();  

exports.createUser = async (data) => await User.create(data);  
