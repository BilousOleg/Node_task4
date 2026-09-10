const { Router } = require('express');
const { validation } = require('../middleware');
const { preordersController } = require('../controllers');

const phonesPreordersRouter = new Router({ mergeParams: true });

phonesPreordersRouter
  .route('/')
  .get(preordersController.getPreordersByPhoneId)
  .post(
    validation.validatePreorderOnCreate,
    preordersController.createPreorderByPhoneId
  );

module.exports = phonesPreordersRouter;
