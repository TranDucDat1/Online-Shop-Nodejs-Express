const _ = require('lodash');
const bcrypt = require('bcrypt');

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
        const user = await UserService.findUserById(req.params.id);
        if(_.isNil(user)) { return res.status(400).send('Not found') };  
        console.log('user', user);
        return res.status(200).json(user);
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