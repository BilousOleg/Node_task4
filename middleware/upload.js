const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const createHttpError = require('http-errors');
const { STATIC_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },

  filename (req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      const extension = path.extname(file.originalname);

      cb(null, `${file.fieldname}-${raw.toString('hex')}${extension}`);
    });
  },
});

function fileFilter (req, file, cb) {
  const MIMETYPE_REGEXP = /^image\/(gif|jpeg|png|jpg)$/;

  if (MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }

  cb(createHttpError(415, 'Support only jpeg/png/gif/jpg mimetypes'));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoneImage = upload.single('image');
