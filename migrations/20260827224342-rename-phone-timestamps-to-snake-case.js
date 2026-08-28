'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('phones', 'createdAt', 'created_at');
    await queryInterface.renameColumn('phones', 'updatedAt', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('phones', 'created_at', 'createdAt');
    await queryInterface.renameColumn('phones', 'updated_at', 'updatedAt');
  },
};
