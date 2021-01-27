"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "user_treasure_prizes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER(11).UNSIGNED,
          unique: "compositeIndex"
        },
        treasureMoneyValueId: {
          allowNull: false,
          type: Sequelize.INTEGER(11).UNSIGNED,
          unique: "compositeIndex"
        },
        amount: {
          allowNull: false,
          type: Sequelize.INTEGER.UNSIGNED,
          unique: "compositeIndex"
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        uniqueKeys: {
          compositeIndex: {
            customIndex: true,
            fields: ["userId", "treasureMoneyValueId", "amount"]
          }
        }
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_treasure_prizes");
  }
};
