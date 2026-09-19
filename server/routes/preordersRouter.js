const { Router } = require('express');
const { validation, paginate } = require('../middleware');
const { preordersController } = require('../controllers');

const preordersRouter = new Router();

preordersRouter
  .route('/')
  .get(
    validation.validatePagination,
    validation.validatePreorderStatus,
    paginate.pagination,
    preordersController.getPreorders
  );

module.exports = preordersRouter;
