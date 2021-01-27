"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TreasureMoneyValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TreasureMoneyValue.belongsTo(models.Treasure, {
        foreignKey: "treasureId"
      });
      TreasureMoneyValue.hasMany(models.UserTreasurePrize);
    }

    /**
     * To find treasure money value
     * @param {*} treasureId
     * @param {*} amount
     */
    static getTreasureMoneyValue(treasureId, amount) {
      return TreasureMoneyValue.findOne({
        where: {
          treasureId: treasureId,
          amount: amount
        }
      });
    }
  }
  TreasureMoneyValue.init(
    {
      treasureId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: true,
      modelName: "TreasureMoneyValue",
      tableName: "treasure_money_values"
    }
  );
  return TreasureMoneyValue;
};
