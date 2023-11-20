'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laptop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Laptop.hasMany(models.User,{foreignKey:"userId"});
      // Laptop.hasMany(models.Payment,{foreignKey:"laptopId"});
    }
  }
  Laptop.init({
    product: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laptop',
  });
  return Laptop;
};