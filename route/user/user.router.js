const express = require('express');
const router = express.Router();

const userController = require('../../controller/userController');
const Authentication = require('../../middleware/authentication');

//Signup
router.get('/user', userController.find);
router.post('/signup', userController.signUp);

//Login
router.post('/login', userController.logIn);

//Profile
router.get('/profile', Authentication.verifyJWT, userController.profile);
router.put('/user/:id', Authentication.verifyJWT, userController.editUser);

//Change Password
router.put('/changePassword/:id', Authentication.verifyJWT, userController.changePassword);

//Forgot Password
router.put('/forgotPassword/:id', userController.forgotPassword);


module.exports = router;