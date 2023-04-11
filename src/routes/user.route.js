const express = require('express')
const router = express.Router()

const { User } = require('../controllers');


router.get('/get-user/:id', User.getUser);

module.exports = router;