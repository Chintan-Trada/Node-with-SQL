const express = require('express');
const router = express.Router();

const categoryRouter = require('../../controller/categoryController');

router.get('/', categoryRouter.findAll);
router.post('/', categoryRouter.create);
router.put('/:id', categoryRouter.update);
router.delete('/id', categoryRouter.delete);

module.exports = router;