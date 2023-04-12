const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

const { UserService } = require('../service');

const { ROLE_USER } = require('../constants/user.constants');
console.log('R: ', ROLE_USER.admin);

exports.getUser = async (req, res ) => {
    try {
        const user = await UserService.findUserById(req.params.id);
        if(_.isNil(user)) { return res.status(400).send('Not found') };  
        console.log('user', user);
        return res.status(200).json(user);
    } catch (error) {
        console.log('error', error);
    }
}

exports.login = async (req, res ) => {
    const data = req.body;
    try {
        // console.log('dataPassword: ', data.password);
        const user = await UserService.findUserByPhone(data.phone);
        // console.log('user: ', user);
        if(_.isNil(user)) { return res.status(404).send('số điện thoại chưa được đăng ký') };

        const checkUser = await bcrypt.compareSync(data.password, user.password);
        // console.log('checkUser', checkUser);
        if(checkUser === false) { return res.status(404).send('mật khẩu không chính xác') };

        const payload = data;
        const token = jwt.sign(payload, 'shhhhh', { algorithm: 'HS256', expiresIn: '1h' });

        const newData = {
            ...data,
            token: token,
        };

        return res.status(200).json(newData);
    } catch (error) {
        console.log('error', error);
    }
}

exports.createUser = async (req, res ) => {
    const data = req.body;
    try {
        if(_.isNil(data.name) || _.isNil(data.phone) || _.isNil(data.email) || _.isNil(data.password)) { return res.status(400).send('name, phone, email, password is required'); }
        const user = await UserService.findUserByPhone(data.phone);
        if(!_.isNil(user)) { return res.status(406).send('số điện thoại đã được đăng ký') }; 

        const password = data.password;
        const hashPassword = bcrypt.hashSync(password, 10);

        const newData = {
            ...data,
            password: hashPassword,
        };

        await UserService.createUser(newData);
        
        console.log('password: ', newData);
        console.log('request: ', req.body);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}

exports.softDeleteUser = async (req, res ) => {
    const user_id = req.params.id;
    try {
        const user = await UserService.findUserById(user_id);
        if(_.isNil(user)) { return res.status(404).send('Not found') };

        await UserService.softDeleteUser(user_id);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}

exports.restoreUser = async (req, res ) => {
    const user_id = req.params.id;
    try {
        await UserService.restoreUser(user_id);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}

exports.deleteUser = async (req, res ) => {
    const user_id = req.params.id;
    try {
        const user = await UserService.findUserDeleted(user_id);
        if(_.isNil(user)) { return res.status(404).send('Không tìm thấy user') };

        await UserService.deleteUserById(user._id);
        console.log('user: ', user);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}