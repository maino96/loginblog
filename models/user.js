'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
      },
      nickname: {
      type: DataTypes.STRING
      },
      password: {
      type: DataTypes.STRING
      },
  }, { 
    timestamps: false,
    sequelize,
    modelName: 'User',
  });
  return User;
};