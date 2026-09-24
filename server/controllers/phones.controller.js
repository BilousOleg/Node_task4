const _ = require('lodash');
const createHttpError = require('http-errors');
const { Phone } = require('../db/models');
const {
  savePhoneImage,
  removePhoneImage,
} = require('../utils/imageProcessing');

module.exports.createPhone = async (req, res, next) => {
  const { body, file } = req;
  let image;

  try {
    image = file ? await savePhoneImage(file) : undefined;

    const createdPhone = await Phone.create({
      ...body,
      image,
    });

    const preparedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    // Якщо помилка - видаляємо зображення, що прийшло з запиту
    if (image) {
      await removePhoneImage(image);
    }

    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundPhones, count } = await Phone.findAndCountAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({
      data: foundPhones,
      pagination: {
        page,
        results: limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
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

  let newImage;

  try {
    const phone = await Phone.findByPk(id);

    if (!phone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const updateData = {
      ...body,
    };

    if (file) {
      newImage = await savePhoneImage(file);
      updateData.image = newImage;
    }

    const [, [updatedPhone]] = await Phone.update(updateData, {
      raw: true,
      where: { id },
      returning: true,
    });

    // Якщо немає помилки (успіх) - видаляємо старе зображення
    if (newImage && phone.image) {
      await removePhoneImage(phone.image);
    }

    const preparedPhone = _.omit(updatedPhone, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    // Якщо помилка - видаляємо нове зображення
    if (newImage) {
      await removePhoneImage(newImage);
    }

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

    // Якщо немає помилки (успіх) - видаляємо файл
    if (phone.image) {
      await removePhoneImage(phone.image);
    }

    res.status(204).send();
  } catch (err) {
    // Якщо є помилка бд АБО видалення файлу - передаємо далі, до errorHandlers
    next(err);
  }
};
