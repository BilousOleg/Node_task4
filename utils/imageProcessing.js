const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { STATIC_PATH } = require('../constants');

module.exports.savePhoneImage = async (file, oldFilename) => {
  if (oldFilename) {
    await fs.writeFile(
      path.join(STATIC_PATH, 'images', oldFilename),
      file.buffer
    );

    return oldFilename;
  }

  const extension = path.extname(file.originalname);
  const filename = `${file.fieldname}-${crypto.randomUUID()}${extension}`;

  await fs.writeFile(path.join(STATIC_PATH, 'images', filename), file.buffer);

  return filename;
};
