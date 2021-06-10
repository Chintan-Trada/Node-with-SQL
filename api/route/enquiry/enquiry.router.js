const express = require('express');
const router = express.Router();

const enquiryRouter = require('../../controller/enquiryController');
const Authentication = require('../../helper/authentication');

const {validator} = require('../../helper/validate');
const Validation = require('../../validation/validation');

router.get('/', Authentication.verifyJWT, enquiryRouter.findAll);
router.post('/', Authentication.verifyJWT, validator.body(Validation.enquiryValidation), enquiryRouter.create);

router.get('/:id' , Authentication.verifyJWT, enquiryRouter.findById)

router.put('/:id', Authentication.verifyJWT, validator.body(Validation.enquiryValidation), enquiryRouter.update);

router.delete('/:id', Authentication.verifyJWT, enquiryRouter.delete);

router.delete('/', Authentication.verifyJWT, enquiryRouter.multipleDelete);


module.exports = router;