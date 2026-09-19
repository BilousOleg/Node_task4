const path = require('path');

const CONSTANTS = {
  STATUSES: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    DONE: 'done',
  },
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
  MIMETYPE_REGEXP: /^image\/(jpeg|png|jpg)$/,
};

module.exports = CONSTANTS;
