const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { STATIC_PATH } = require('../constants');

const getImagePath = filename => path.join(STATIC_PATH, 'images', filename);

module.exports.savePhoneImage = async file => {
  const extension = path.extname(file.originalname);
  const filename = `${file.fieldname}-${crypto.randomUUID()}${extension}`;

  await fs.writeFile(getImagePath(filename), file.buffer);

  return filename;
};

module.exports.removePhoneImage = async filename => {
  try {
    await fs.unlink(getImagePath(filename));
  } catch (err) {
    // Єдине виключення для відсутнього файлу,
    // адже для нас це по-суті не помилка - файлу вже немає
    if (err.code === 'ENOENT') {
      return;
    }

    throw err;
  }
};
