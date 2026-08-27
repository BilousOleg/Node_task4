'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
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
        field: 'manufactured_year',
        validate: {
          isInt: true,
          min: 1970,
          max: new Date().getFullYear(),
        },
      },
      ramSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ram_size',
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
        field: 'screen_diagonal',
        validate: {
          min: 1,
          max: 100,
        },
      },
      hasNfc: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'has_nfc',
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
    }
  );
  return Phone;
};
