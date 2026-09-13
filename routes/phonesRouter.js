const { Router } = require('express');
const { phonesController } = require('../controllers');
const { paginate, validation } = require('../middleware');
const phonesPreordersRouter = require('./phonesPreordersRouter');
const { upload } = require('../middleware');

const phonesRouter = new Router();

phonesRouter
  .route('/')
  .get(
    validation.validatePagination,
    paginate.pagination,
    phonesController.getPhones
  )
  .post(
    upload.uploadPhoneImage,
    validation.validatePhoneOnCreate,
    phonesController.createPhone
  );

// Навішування обробника id на весь маршрут, який має параметр id
phonesRouter.use('/:id', validation.validateId);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(
    upload.uploadPhoneImage,
    validation.validatePhoneOnUpdate,
    phonesController.updatePhoneById
  )
  .delete(phonesController.deletePhoneById);

phonesRouter.use('/:id/preorders', phonesPreordersRouter);

module.exports = phonesRouter;
