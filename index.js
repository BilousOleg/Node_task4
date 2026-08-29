const { Op } = require('sequelize');
const { sequelize, Phone } = require('./models');

(async () => {
  try {
    // додавання нового телефону
    const newPhone = {
      model: 'Galaxy S26',
      brand: 'Samsung',
      manufacturedYear: 2025,
      ramSize: 12000, // mb
      cpu: 'Qualcomm Snapdragon 8 Elite',
      screenDiagonal: 6.2,
      hasNfc: true,
    };

    const createdPhone = await Phone.create(newPhone);
    console.log(createdPhone);

    //отримання списку телефонів (* 3-я сторінка при перегляді по 4 телефони на сторінці, упорядкованих за роком виробництва)
    const page = 3;
    const results = 4;

    const foundPhonesPaginated = await Phone.findAll({
      raw: true,
      order: ['manufacturedYear'],
      limit: results,
      offset: (page - 1) * results,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    console.log('Found phones paginated:', foundPhonesPaginated);

    //*отримання списку телефонів певного року видання
    const manufacturedYear = 2025;

    const foundPhonesByYear = await Phone.findAll({
      raw: true,
      where: {
        manufacturedYear,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    console.log('Found phones by year:', foundPhonesByYear);

    // *отримання списку телефонів старше 2020 року випуску
    const foundPhonesOld = await Phone.findAll({
      raw: true,
      where: {
        manufacturedYear: {
          [Op.lt]: 2020,
        },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    console.log('Found phones older than 2020:', foundPhonesOld);

    // оновлення: змінити розмір оперативної пам'яті телефону з id: 1
    const [, [updatedPhone]] = await Phone.update(
      { ramSize: 10000 },
      {
        raw: true,
        where: {
          id: 1,
        },
        returning: true,
      }
    );

    console.log('Updated phone:', updatedPhone);

    // *оновлення: додати нфс всім телефонам 2021 року випуску

    const [, updatedPhones] = await Phone.update(
      { hasNfc: true },
      {
        raw: true,
        where: {
          manufacturedYear: 2021,
        },
        returning: true,
      }
    );

    console.log('Updated phones:', updatedPhones);

    // видалення телефону з id: 2

    const deletedPhoneCount = await Phone.destroy({ where: { id: 2 } });

    console.log(deletedPhoneCount);

    // *видалення телефонів 2010 року випуску

    const deletedPhonesCount = await Phone.destroy({
      where: { manufacturedYear: 2010 },
    });

    console.log('Deleted phones:', deletedPhonesCount);
  } catch (err) {
    console.error(err);
  }
})();
