const express = require('express');
const router = express.Router();

const userRouter = require('./user/user.router');
const categoryRouter = require('./category/category.router');
const portfolioRouter = require('./portfolio/portfolio.router');
const testnomialRouter = require('./testnomial/testnomial.router');
const enquiryRouter = require('./enquiry/enquiry.router');

router.use('/', userRouter);
router.use('/category', categoryRouter);
router.use('/portfolio', portfolioRouter);
router.use('/testnomial', testnomialRouter);
router.use('/enquiry', enquiryRouter);

module.exports = router;