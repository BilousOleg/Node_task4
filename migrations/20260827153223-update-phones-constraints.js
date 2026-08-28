'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('phones', 'model', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'manufactured_year', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'ram_size', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'screen_diagonal', {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('phones', 'has_nfc', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addConstraint('phones', {
      fields: ['brand', 'model'],
      type: 'unique',
      name: 'phones_brand_model_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'phones',
      'phones_brand_model_unique'
    );

    await queryInterface.changeColumn('phones', 'model', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'manufactured_year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'ram_size', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'screen_diagonal', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });

    await queryInterface.changeColumn('phones', 'has_nfc', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    });
  },
};
