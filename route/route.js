const express = require('express');
const router = express.Router();

const userRouter = require('./user/user.router');
const categoryRouter = require('./category/category.router');
const portfolioRouter = require('./portfolio/portfolio.route');

router.use('/', userRouter);
router.use('/category', categoryRouter);
router.use('/portfolio', portfolioRouter);

module.exports = router;