const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/signup', userController.find);
router.post('/signup', userController.signUp);

router.post('/login', userController.LogIn);

module.exports = router;