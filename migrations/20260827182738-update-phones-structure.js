'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Phones', 'model', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'brand', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'cpu', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Phones', 'model', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
