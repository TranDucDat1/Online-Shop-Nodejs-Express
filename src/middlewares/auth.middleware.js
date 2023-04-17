const jwt = require('jsonwebtoken');
const _ = require('lodash');


const {  UserService } = require('../service');

const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.token).split(" ")[1];
        const decode = jwt.verify(token, 'shhhhh');
        const user = await UserService.findUserByPhone(decode.phone);
        if(_.isNil(user)) { return res.status(401) }
        
        req.user = {
            user_id: decode.user_id,
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

module.exports = checkAuth;