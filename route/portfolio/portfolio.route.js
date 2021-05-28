const express = require('express');
const router = express.Router();

const portfolioController = require('../../controller/portfolioController');

router.get('/',portfolioController.findAll);
router.post('/', portfolioController.create);

router.get('/:id', portfolioController.findById);

router.put('/:id', portfolioController.update);

router.delete('/:id', portfolioController.delete);

module.exports = router