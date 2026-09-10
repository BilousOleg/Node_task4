'use strict';

const { format, addDays } = require('date-fns');
const { Model } = require('sequelize');
const { STATUSES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class Preorder extends Model {
    static associate (models) {
      Preorder.belongsTo(models.Phone, {
        foreignKey: {
          name: 'phoneId',
          allowNull: false,
        },
      });
    }
  }
  Preorder.init(
    {
      creationDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isNotInFuture (value) {
            const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

            if (value >= tomorrow) {
              throw new Error('Creation date cannot be in the future');
            }
          },
        },
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(STATUSES)),
        defaultValue: STATUSES.PENDING,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 100, // не обов'язково, але додав
          isInt: true,
        },
        allowNull: false,
      },
      customerTel: {
        type: DataTypes.STRING(16),
        validate: {
          is: /^\+[1-9]\d{7,14}$/,
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Preorder',
      underscored: true,
    }
  );
  return Preorder;
};
