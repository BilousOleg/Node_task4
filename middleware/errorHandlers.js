const {
  UniqueConstraintError,
  ValidationError,
  BaseError,
} = require('sequelize');
const { ValidationError: YupValidationError } = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof YupValidationError) {
    const errors = err.errors.map(m => ({ status: 422, title: m }));

    return res.status(422).send(errors);
  }

  next(err);
};

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    return res.status(422).send([
      {
        status: 422,
        title: err.message,
      },
    ]);
  }

  if (err instanceof ValidationError) {
    const errors = err.errors.map(e => ({
      status: 422,
      title: e.message,
    }));

    return res.status(422).send(errors);
  }

  if (err instanceof BaseError) {
    return res.status(500).send([
      {
        status: 500,
        title: 'Database Error',
      },
    ]);
  }

  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(status).send([
    {
      status,
      title: message,
    },
  ]);
};
