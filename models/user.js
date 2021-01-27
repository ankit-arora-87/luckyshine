"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserTreasurePrize);
    }

    /**
     * to get user info by email
     * @param {*} email
     */
    static getUserByEmail(email) {
      return User.findOne({
        where: { email: email }
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      tableName: "users"
    }
  );

  return User;
};
