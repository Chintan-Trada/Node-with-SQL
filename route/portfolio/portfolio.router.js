const express = require('express');
const router = express.Router();

const portfolioController = require('../../controller/portfolioController');
const Authentication = require('../../middleware/authentication');

router.get('/', Authentication.verifyJWT, portfolioController.findAll);
router.post('/', Authentication.verifyJWT, portfolioController.create);

router.get('/:id', Authentication.verifyJWT, portfolioController.findById);

router.put('/:id', Authentication.verifyJWT, portfolioController.update);

router.delete('/:id', Authentication.verifyJWT, portfolioController.delete);

module.exports = router