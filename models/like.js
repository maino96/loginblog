'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    id:{type : DataTypes.INTEGER,
      primaryKey:true},
      postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, 
  {
    timestamps: false,
    sequelize,
    modelName: 'Like',
  });
  return Like;
};