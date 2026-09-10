'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate (models) {
      Phone.hasMany(models.Preorder, {
        foreignKey: {
          name: 'phoneId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      brand: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      manufacturedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1970,
          max: new Date().getFullYear(),
        },
      },
      ramSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      cpu: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      screenDiagonal: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate: {
          min: 1,
          max: 100,
        },
      },
      hasNfc: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Phone',
      indexes: [
        {
          unique: true,
          fields: ['brand', 'model'],
        },
      ],
      underscored: true,
    }
  );
  return Phone;
};
