const _ = require('lodash');

const { UserService } = require('../service');

exports.getUser = async (req, res ) => {
    try {
        const user = await UserService.findUser(req.params.id);
        if(_.isNil(user)) { return res.status(400).send('Not found') };  
        console.log('user', user);
        return res.status(200).json(user);
    } catch (error) {
        console.log('error', error);
    }
}