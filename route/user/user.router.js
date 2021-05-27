const express = require('express');
const router = express.Router();

const userController = require('../../controller/userController');

router.get('/user', userController.find);
router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.put('/user/:id', userController.editUser);

module.exports = router;