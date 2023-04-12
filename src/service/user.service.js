const User = require('../models/user.model');

exports.findUserById = async (id) => await User.findById(id).lean();

exports.findUserByPhone = async (phoneNumber) => await User.findOne({ phone: phoneNumber }).exec();  

exports.createUser = async (data) => await User.create(data);

exports.softDeleteUser = async (id) => await User.deleteById(id);

exports.restoreUser = async (id) => await User.findOneAndUpdateDeleted({ _id: id }, { $set: { deleted: false } });

exports.findUserDeleted = async (id) => await User.findOneDeleted({ _id: id });

exports.deleteUserById = async (id) => await User.deleteOne({ _id: id });

exports.updateUser = async (id, name, email) => await User.findOneAndUpdate({ _id: id }, { $set: { name, email } }, { new: true });
