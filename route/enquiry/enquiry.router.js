const express = require('express');
const router = express.Router();

const enquiryRouter = require('../../controller/enquiryController');
const Authentication = require('../../middleware/authentication');

router.get('/', Authentication.verifyJWT, enquiryRouter.findAll);
router.post('/', Authentication.verifyJWT, enquiryRouter.create);

router.get('/:id' , Authentication.verifyJWT, enquiryRouter.findById)

router.put('/:id', Authentication.verifyJWT, enquiryRouter.update);

router.delete('/:id', Authentication.verifyJWT, enquiryRouter.delete);

module.exports = router;