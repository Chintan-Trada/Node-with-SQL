const express = require('express');
const router = express.Router();

const categoryRouter = require('../../controller/categoryController');
const Authentication = require('../../middleware/authentication');

const {validator} = require('../../validation/validate');
const Validation = require('../../validation/validation');


router.get('/', Authentication.verifyJWT, categoryRouter.findAll);
router.post('/', validator.body(Validation.categoryValidation), categoryRouter.create);

router.get('/:id' , Authentication.verifyJWT, categoryRouter.findById)

router.put('/:id', Authentication.verifyJWT, categoryRouter.update);

router.delete('/:id', Authentication.verifyJWT, categoryRouter.delete);

module.exports = router;