'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('phones', {
      fields: ['manufactured_year'],
      type: 'check',
      name: 'manufactured_year_check',
      where: {
        manufactured_year: {
          [Sequelize.Op.gte]: 1970,
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['ram_size'],
      type: 'check',
      name: 'ram_size_check',
      where: {
        ram_size: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });

    await queryInterface.addConstraint('phones', {
      fields: ['screen_diagonal'],
      type: 'check',
      name: 'screen_diagonal_check',
      where: {
        screen_diagonal: {
          [Sequelize.Op.gt]: 0,
          [Sequelize.Op.lte]: 100,
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('phones', 'manufactured_year_check');
    await queryInterface.removeConstraint('phones', 'ram_size_check');
    await queryInterface.removeConstraint('phones', 'screen_diagonal_check');
  },
};
