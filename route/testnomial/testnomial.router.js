const express = require('express');
const router = express.Router();

const testnomialRouter = require('../../controller/testnomialController');
const Authentication = require('../../middleware/authentication');


router.get('/', Authentication.verifyJWT, testnomialRouter.findAll);
router.post('/', Authentication.verifyJWT, testnomialRouter.create);

router.get('/:id' , Authentication.verifyJWT, testnomialRouter.findById)

router.put('/:id', Authentication.verifyJWT, testnomialRouter.update);

router.delete('/:id', Authentication.verifyJWT, testnomialRouter.delete);

module.exports = router;