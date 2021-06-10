const express = require('express');
const router = express.Router();

const categoryRouter = require('../../controller/categoryController');
const Authentication = require('../../helper/authentication');

const {validator} = require('../../helper/validate');
const Validation = require('../../validation/validation');



router.get('/', Authentication.verifyJWT, categoryRouter.findAll);
router.post('/',  Authentication.verifyJWT, validator.body(Validation.categoryValidation), categoryRouter.create);

router.get('/:id' , Authentication.verifyJWT, categoryRouter.findById)

router.put('/:id', Authentication.verifyJWT, validator.body(Validation.categoryValidation), categoryRouter.update);

router.delete('/:id', Authentication.verifyJWT, categoryRouter.delete);

router.delete('/', Authentication.verifyJWT, categoryRouter.multipleDelete);

module.exports = router;