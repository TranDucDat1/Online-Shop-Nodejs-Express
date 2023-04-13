const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { User } = require('../controllers');
const {  UserService } = require('../service');

const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.token).split(" ")[1];
        const decode = jwt.verify(token, 'shhhhh');
        const user = await UserService.findUserByPhone(decode.phone);
        if(_.isNil(user)) { return res.status(401) }
        
        req.user = {
            phone: decode.phone,
            name: decode.name,
            role: decode.role
        };
        next();
    } catch (error) {
        res.status(401).send('Unauthenticated');
        console.log('error', error);
    }
}; 

router.get('/get-user/:id', checkAuth, User.getUser);
router.get('/get-many-user', checkAuth, User.getManyUser);
router.post('/login', User.login);
router.post('/create-user', checkAuth, User.createUser);
router.delete('/soft-delete-user/:id', checkAuth, User.softDeleteUser);
router.get('/restore-user/:id', checkAuth, User.restoreUser);
router.delete('/delete-user/:id', checkAuth, User.deleteUser);
router.patch('/update-user/:id', checkAuth, User.updateUser);

module.exports = router;