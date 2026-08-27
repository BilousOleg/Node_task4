'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Phones', 'model', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'manufactured_year', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'ram_size', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'screen_diagonal', {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('Phones', 'has_nfc', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addConstraint('Phones', {
      fields: ['brand', 'model'],
      type: 'unique',
      name: 'phones_brand_model_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Phones',
      'phones_brand_model_unique'
    );

    await queryInterface.changeColumn('Phones', 'model', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'brand', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'manufactured_year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'ram_size', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'cpu', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'screen_diagonal', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });

    await queryInterface.changeColumn('Phones', 'has_nfc', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    });
  },
};
