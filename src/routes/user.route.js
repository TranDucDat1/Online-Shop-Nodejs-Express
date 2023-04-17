const express = require('express')
const router = express.Router()

const { User } = require('../controllers');
const checkAuth = require('../middlewares/auth.middleware');

router.get('/get-user/:id', checkAuth, User.getUser);
router.get('/get-many-user', checkAuth, User.getManyUser);
router.post('/login', User.login);
router.post('/create-user', checkAuth, User.createUser);
router.delete('/soft-delete-user/:id', checkAuth, User.softDeleteUser);
router.get('/restore-user/:id', checkAuth, User.restoreUser);
router.delete('/delete-user/:id', checkAuth, User.deleteUser);
router.patch('/update-user/:id', checkAuth, User.updateUser);

module.exports = router;