const express = require('express');
const router = express.Router();

const userRouter = require('./user/user.router');
const categoryRouter = require('./category/category.router');

router.use('/', userRouter);
router.use('/category', categoryRouter);

module.exports = router;