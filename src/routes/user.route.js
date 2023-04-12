const express = require('express')
const router = express.Router()

const { User } = require('../controllers');

const checkAuthAndRole = (req, res) => {

};  

router.get('/get-user/:id', User.getUser);
router.get('/get-many-user', User.getManyUser);
router.post('/login', User.login);
router.post('/create-user', User.createUser);
router.delete('/soft-delete-user/:id', User.softDeleteUser);
router.get('/restore-user/:id', User.restoreUser);
router.delete('/delete-user/:id', User.deleteUser);
router.patch('/update-user/:id', User.updateUser);

module.exports = router;