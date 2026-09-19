const multer = require('multer');
const createHttpError = require('http-errors');

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
