const express = require('express');
const router = express.Router();

const testnomialRouter = require('../../controller/testnomialController');
const Authentication = require('../../middleware/authentication');

const {validator} = require('../../validation/validate');
const Validation = require('../../validation/validation');

router.get('/', Authentication.verifyJWT, testnomialRouter.findAll);
router.post('/', Authentication.verifyJWT, validator.body(Validation.testnomialValidation), testnomialRouter.create);

router.get('/:id' , Authentication.verifyJWT, testnomialRouter.findById)

router.put('/:id', Authentication.verifyJWT, validator.body(Validation.testnomialValidation), testnomialRouter.update);

router.delete('/:id', Authentication.verifyJWT, testnomialRouter.delete);

router.delete('/', Authentication.verifyJWT, testnomialRouter.multipleDelete);


module.exports = router;