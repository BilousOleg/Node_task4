const createHttpError = require('http-errors');
const _ = require('lodash');
const { format } = require('date-fns');
const { Preorder, Phone } = require('../db/models');

module.exports.getPreorders = async (req, res, next) => {
  const {
    pagination: { limit, offset },
    query: { status },
  } = req;

  const where = {};

  if (status) {
    where.status = status;
  }

  try {
    const foundPreorders = await Preorder.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where,
      limit,
      offset,
      order: ['id'],
      include: [
        {
          model: Phone,
          attributes: ['brand', 'model'],
          // кольору в моделі телефону немає, тому тільки бренд і модель
        },
      ],
    });

    res.status(200).send({ data: foundPreorders });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreordersByPhoneId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone not found'));
    }

    const preorders = await phone.getPreorders({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: preorders });
  } catch (err) {
    next(err);
  }
};

module.exports.createPreorderByPhoneId = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone not found'));
    }

    const createdPreorder = await phone.createPreorder({
      ...body,
      creationDate: format(new Date(), 'yyyy-MM-dd'),
    });

    const preparedPreorder = _.omit(createdPreorder.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedPreorder });
  } catch (err) {
    next(err);
  }
};
