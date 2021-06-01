const express = require('express');
const router = express.Router();

const portfolioController = require('../../controller/portfolioController');
const Authentication = require('../../middleware/authentication');

const {validator} = require('../../validation/validate');
const Validation = require('../../validation/validation');

router.get('/', Authentication.verifyJWT, portfolioController.findAll);
router.post('/', Authentication.verifyJWT, validator.body(Validation.portfolioValidation), portfolioController.create);

router.get('/:id', Authentication.verifyJWT, portfolioController.findById);

router.put('/:id', Authentication.verifyJWT, validator.body(Validation.portfolioValidation), portfolioController.update);

router.delete('/:id', Authentication.verifyJWT, portfolioController.delete);

router.delete('/', Authentication.verifyJWT, portfolioController.multipleDelete);


module.exports = router