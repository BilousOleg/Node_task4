'use strict';

const { STATUSES } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('preorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...Object.values(STATUSES)),
        defaultValue: STATUSES.PENDING,
        allowNull: false,
      },
      phone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customer_tel: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('preorders', {
      fields: ['count'],
      type: 'check',
      name: 'preorders_count_range',
      where: {
        count: {
          [Sequelize.Op.gte]: 1,
          [Sequelize.Op.lte]: 100,
        },
      },
    });

    await queryInterface.addConstraint('preorders', {
      fields: ['customer_tel'],
      type: 'check',
      name: 'preorders_customer_tel_format',
      where: {
        customer_tel: {
          [Sequelize.Op.regexp]: '^\\+[1-9]\\d{7,14}$',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('preorders');
  },
};
