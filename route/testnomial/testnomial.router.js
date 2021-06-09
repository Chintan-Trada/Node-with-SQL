const express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer');

const testnomialRouter = require('../../controller/testnomialController');
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

var upload = multer({ storage: storage }).array('image',10);


router.get('/', Authentication.verifyJWT, testnomialRouter.findAll);
router.post('/', Authentication.verifyJWT,upload, validator.body(Validation.testnomialValidation), testnomialRouter.create);

router.get('/:id' , Authentication.verifyJWT, testnomialRouter.findById)

router.put('/:id', Authentication.verifyJWT,upload, validator.body(Validation.testnomialValidation), testnomialRouter.update);

router.delete('/:id', Authentication.verifyJWT, testnomialRouter.delete);

router.delete('/', Authentication.verifyJWT, testnomialRouter.multipleDelete);


module.exports = router;