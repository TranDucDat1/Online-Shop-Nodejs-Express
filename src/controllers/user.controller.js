const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

const { UserService } = require('../service');

const { ROLE_USER } = require('../constants/user.constants');

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

exports.getManyUser = async (req, res ) => {
    const userRequest = req.user;
    const searchName= new RegExp(req.query.name, 'i');
    const queryUser = _.omitBy(
        {
            name: searchName,
            phone: req.query.phone,
        },
        _.isNil
    )
    const filter = {
        pageNumber: req.query.pageNumber ? Number(req.query.pageNumber) : 0,
        limit:  req.query.limit ? Number(req.query.limit) : 10
    }

    const sortByName = {
        name: req.query.sort ? req.query.sort : {}
    }
    try {  
        if(userRequest.role === ROLE_USER.customer || userRequest.role === ROLE_USER.owner) { return res.status(401).send('Bạn không có quyền truy cập') }
        
        // const phone = query.phone;
        const users = await UserService.findManyUser(queryUser, filter, sortByName);
        // console.log('user', user);
        
        const data = {
            users,
            pageNumber: req.query.pageNumber,
        }
        
        return res.status(200).json(data);
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

        const payload = {
            user_id: user._id,
            phone: user.phone,
            role: user.role,
            name: user.name
        };
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
    const userRequest = req.user;
    try {
        if(userRequest.role === ROLE_USER.customer || userRequest.role === ROLE_USER.owner) { return res.status(401).send('Bạn không có quyền truy cập') }

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

        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
        return res.status(500).send('lỗi server')
    }
}

exports.softDeleteUser = async (req, res ) => {
    const user_id = req.params.id;
    const userRequest = req.user;
    try {
        if(userRequest.role === ROLE_USER.customer || userRequest.role === ROLE_USER.owner) { return res.status(401).send('Bạn không có quyền truy cập') }
        
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
    const userRequest = req.user;
    try {
        if(userRequest.role === ROLE_USER.customer || userRequest.role === ROLE_USER.owner) { return res.status(401).send('Bạn không có quyền truy cập') }

        await UserService.restoreUser(user_id);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}

exports.deleteUser = async (req, res ) => {
    const userRequest = req.user;
    const user_id = req.params.id;
    try {
        if(userRequest.role === ROLE_USER.customer || userRequest.role === ROLE_USER.owner) { return res.status(401).send('Bạn không có quyền truy cập') }

        const user = await UserService.findUserDeleted(user_id);
        if(_.isNil(user)) { return res.status(404).send('Không tìm thấy user') };

        await UserService.deleteUserById(user._id);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error', error);
    }
}

exports.updateUser = async (req, res ) => {
    const user_id = req.params.id;
    const data = req.body;
    try {
        const result = await UserService.updateUser(user_id, data.name, data.email);
        if(_.isNil(result)) { return res.status(404).send('Không tìm thấy user') };
        return res.status(200).json(result);
    } catch (error) {
        console.log('error', error);
    }
}