"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTreasurePrize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTreasurePrize.belongsTo(models.User, {
        foreignKey: "userId"
      });
      UserTreasurePrize.belongsTo(models.TreasureMoneyValue, {
        foreignKey: "treasureMoneyValueId"
      });
    }

    /**
     * To claim treasure prize by user
     * @param {*} userId
     * @param {*} treasureMoneyValueId
     * @param {*} amount
     */
    static claimTreasurePrize(userId, treasureMoneyValueId, amount) {
      return UserTreasurePrize.create({
        userId: userId,
        treasureMoneyValueId: treasureMoneyValueId,
        amount: amount
      });
    }
  }
  UserTreasurePrize.init(
    {
      userId: { type: DataTypes.INTEGER },
      treasureMoneyValueId: {
        type: DataTypes.INTEGER
      },
      amount: { type: DataTypes.INTEGER }
    },
    {
      sequelize,
      timestamps: true,
      modelName: "UserTreasurePrize",
      tableName: "user_treasure_prizes"
    }
  );
  return UserTreasurePrize;
};
