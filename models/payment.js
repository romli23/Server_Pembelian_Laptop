'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Payment.belongsTo(models.User,{foreignKey:"userId"});
      // Payment.belongsTo(models.Laptop,{foreignKey:"laptopId"});
    }
  }
  Payment.init({
    product: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    laptopId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};