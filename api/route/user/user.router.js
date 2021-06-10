const express = require('express');
const router = express.Router();

const userController = require('../../controller/userController');
const Authentication = require('../../helper/authentication');

const {validator} = require('../../helper/validate');
const Validation = require('../../validation/validation');

//Signup
router.get('/user', userController.find);
router.post('/signup',validator.body(Validation.userValidation),  userController.signUp);

//Login
router.post('/login',validator.body(Validation.loginValidation),  userController.logIn);

//Profile
router.get('/profile', Authentication.verifyJWT, userController.profile);
router.put('/user/:id', Authentication.verifyJWT,validator.body(Validation.userValidation),  userController.editUser);

//Change Password
router.put('/changePassword/:id', Authentication.verifyJWT,validator.body(Validation.changePasswordValidation),  userController.changePassword);

//Forgot Password
router.put('/forgotPassword/:id', validator.body(Validation.forgotpasswordValidation), userController.forgotPassword);


module.exports = router;