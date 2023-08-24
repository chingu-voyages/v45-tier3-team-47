'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PointOfInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PointOfInterest.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    city: DataTypes.STRING,
    website: DataTypes.STRING,
    post_code: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PointOfInterest',
  });
  return PointOfInterest;
};