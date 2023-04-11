const express = require('express')
const router = express.Router()

const { getUsers } = require('../controllers/user.controller');
const { getUsers2 } = require('../controllers/user.controller');


router.get('/get-user/:id', getUsers);
router.get('/get-users/:id', getUsers2);

module.exports = router;