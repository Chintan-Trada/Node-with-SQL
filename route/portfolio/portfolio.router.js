const express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer');

const portfolioController = require('../../controller/portfolioController');
const Authentication = require('../../middleware/authentication');

const {validator} = require('../../validation/validate');
const Validation = require('../../validation/validation');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

var upload = multer({ storage: storage }).single('image');

router.get('/', Authentication.verifyJWT, portfolioController.findAll);
router.post('/', Authentication.verifyJWT, upload, validator.body(Validation.portfolioValidation), portfolioController.create);

router.get('/:id', Authentication.verifyJWT, portfolioController.findById);

router.put('/:id', Authentication.verifyJWT, upload, validator.body(Validation.portfolioValidation), portfolioController.update);

router.delete('/:id', Authentication.verifyJWT, portfolioController.delete);

router.delete('/', Authentication.verifyJWT, portfolioController.multipleDelete);


module.exports = router