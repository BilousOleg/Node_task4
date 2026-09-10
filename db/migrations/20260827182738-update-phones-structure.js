'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('phones', 'model', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'brand', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'cpu', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('phones', 'model', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
