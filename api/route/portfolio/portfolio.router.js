const express = require('express');
const router = express.Router();


const portfolioController = require('../../controller/portfolioController');
const {verifyJWT} = require('../../helper/authentication');

const {validator} = require('../../helper/validate');
const Validation = require('../../validation/validation');

const {upload_single} = require('../../service/multer');


router.get('/', verifyJWT, portfolioController.findAll);
router.post('/', verifyJWT, upload_single, validator.body(Validation.portfolioValidation), portfolioController.create);

router.get('/:id', verifyJWT, portfolioController.findById);

router.put('/:id', verifyJWT, upload_single, validator.body(Validation.portfolioValidation), portfolioController.update);

router.delete('/:id', verifyJWT, portfolioController.delete);

router.delete('/', verifyJWT, portfolioController.multipleDelete);


module.exports = router