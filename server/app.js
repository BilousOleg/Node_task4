const express = require('express');
const router = require('./routes');
const { errorHandlers } = require('./middleware');
const { STATIC_PATH } = require('../constants');

const app = express();

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(
  errorHandlers.validationErrorHandler,
  errorHandlers.dbErrorHandler,
  errorHandlers.errorHandler
);

module.exports = app;
