const fs = require('fs/promises');
const path = require('path');
const _ = require('lodash');
const createHttpError = require('http-errors');
const { Phone } = require('../db/models');
const { savePhoneImage } = require('../utils/imageProcessing');
const { STATIC_PATH } = require('../constants');

module.exports.createPhone = async (req, res, next) => {
  const { body, file } = req;

  try {
    const image = file ? await savePhoneImage(file) : undefined;

    const createdPhone = await Phone.create({
      ...body,
      image,
    });

    if (!createdPhone) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const preparedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPhone = await Phone.findByPk(id, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send({ data: foundPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    file,
    params: { id },
  } = req;

  try {
    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const updateData = {
      ...body,
    };

    if (file) {
      // Зараз зображення додається, навіть якщо в бд буде помилка (обмеження, тощо), але поки не знаю, що з цим робити
      updateData.image = await savePhoneImage(file, phone.image);
    }

    const [, [updatedPhone]] = await Phone.update(updateData, {
      raw: true,
      where: { id },
      returning: true,
    });

    const preparedPhone = _.omit(updatedPhone, ['createdAt', 'updatedAt']);

    res.status(200).send(preparedPhone);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    await Phone.destroy({ where: { id } });

    if (phone.image) {
      // Тут так само - якщо видалення з помилкою в базі, то зображення не видалиться
      await fs.unlink(path.join(STATIC_PATH, 'images', phone.image));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
