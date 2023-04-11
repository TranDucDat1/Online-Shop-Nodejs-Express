const express = require('express')
const router = express.Router()

const { User } = require('../controllers');

const checkAuthAndRole = (req, res) => {

};  

router.get('/get-user/:id', User.getUser);
router.get('/login', User.login);
router.post('/create-user', User.createUser);

module.exports = router;