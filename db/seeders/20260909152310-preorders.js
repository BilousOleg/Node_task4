'use strict';

const {
  STATUSES: { PENDING, CONFIRMED },
} = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const [iphone12] = await queryInterface.sequelize.query(
      ` SELECT id FROM phones WHERE brand = 'Apple' AND model = 'iPhone 12' `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const [galaxyS20] = await queryInterface.sequelize.query(
      ` SELECT id FROM phones WHERE brand = 'Samsung' AND model = 'Galaxy S20' `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const [nokiaN8] = await queryInterface.sequelize.query(
      ` SELECT id FROM phones WHERE brand = 'Nokia' AND model = 'N8' `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkInsert('preorders', [
      {
        phone_id: iphone12.id,
        creation_date: '2026-09-01',
        count: 2,
        status: PENDING,
        customer_tel: '+380501234567',
        created_at: now,
        updated_at: now,
      },
      {
        phone_id: iphone12.id,
        creation_date: '2026-09-02',
        count: 1,
        status: CONFIRMED,
        customer_tel: '+380671234567',
        created_at: now,
        updated_at: now,
      },
      {
        phone_id: galaxyS20.id,
        creation_date: '2026-09-03',
        count: 3,
        status: PENDING,
        customer_tel: '+380931234567',
        created_at: now,
        updated_at: now,
      },
      {
        phone_id: nokiaN8.id,
        creation_date: '2026-09-04',
        count: 1,
        status: PENDING,
        customer_tel: '+380951234567',
        created_at: now,
        updated_at: now,
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('preorders', null, {});
  },
};
