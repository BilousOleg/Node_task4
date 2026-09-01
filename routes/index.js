const { Router } = require('express');
const phonesRouter = require('./phonesRouter');

const router = new Router();

router.use('/phones', phonesRouter);

module.exports = router;
