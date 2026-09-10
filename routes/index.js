const { Router } = require('express');
const phonesRouter = require('./phonesRouter');
const preordersRouter = require('./preordersRouter');

const router = new Router();

router.use('/phones', phonesRouter);
router.use('/preorders', preordersRouter);

module.exports = router;
