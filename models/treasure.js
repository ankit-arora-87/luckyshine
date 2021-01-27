"use strict";
const { Model, QueryTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Treasure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Treasure.hasMany(models.TreasureMoneyValue);
    }

    /**
     * To find near by treasures by user's current location & allowed distance range
     * @param {*} latitude
     * @param {*} longitude
     * @param {*} distance
     * @param {*} treasureId
     */
    static async findNearByTreasures(
      latitude,
      longitude,
      distance,
      treasureId = false
    ) {
      const treasureIdClasue =
        treasureId !== false ? ` WHERE id = ${treasureId} ` : "";
      const treasures = await sequelize.query(
        `SELECT
            id, name,  (
              6371 * acos (
                cos ( radians($latitude) )
                * cos( radians( latitude ) )
                * cos( radians( longitude ) - radians($longitude) )
                + sin ( radians($latitude) )
                * sin( radians( latitude ) )
              )
            ) AS distance
          FROM treasures
          ${treasureIdClasue}
          HAVING distance < $distance
          ORDER BY distance
          LIMIT 0 , 10`,
        {
          bind: {
            latitude: latitude,
            longitude: longitude,
            distance: distance
          },
          type: QueryTypes.SELECT
        }
      );
      return treasures;
    }

    /**
     * To find reasures by prize value
     * @param {*} treasures
     * @param {*} prizeValue
     */
    static async findTreasuresByPrizeValue(treasures, prizeValue) {
      const treasuresByPrize = await sequelize.query(
        `SELECT 
                  min(amount) as amt, treasureId 
                  FROM treasure_money_values 
                  WHERE treasureId in (:treasures) 
                  AND amount >= :prize_value
                  GROUP by treasureId
                `,

        {
          replacements: { treasures: treasures, prize_value: prizeValue },
          type: QueryTypes.SELECT
        }
      );
      return treasuresByPrize;
    }
  }
  Treasure.init(
    {
      name: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Treasure",
      tableName: "treasures"
    }
  );
  return Treasure;
};
