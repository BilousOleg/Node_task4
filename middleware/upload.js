const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const createHttpError = require('http-errors');
const { STATIC_PATH } = require('../constants');

const storage = multer.memoryStorage();

function fileFilter (req, file, cb) {
  const MIMETYPE_REGEXP = /^image\/(jpeg|png|jpg)$/;

  if (MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }

  cb(createHttpError(415, 'Support only jpeg/png/jpg mimetypes'));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoneImage = upload.single('image');

module.exports.processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const extension = path.extname(req.file.originalname);
    const filename = `${req.file.fieldname}-${crypto.randomUUID()}${extension}`;

    await fs.writeFile(
      path.join(STATIC_PATH, 'images', filename),
      req.file.buffer
    );

    req.file.filename = filename;

    next();
  } catch (err) {
    next(err);
  }
};
