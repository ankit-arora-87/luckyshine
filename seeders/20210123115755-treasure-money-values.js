"use strict";
const treasuresMoneyValues = require("../public/data/treasures_money_values.json");
const todayDate = new Date()
  .toISOString()
  .replace(/T/, " ")
  .replace(/\..+/, "");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    treasuresMoneyValues.map(treasuresMoneyValue => {
      treasuresMoneyValue.createdAt = treasuresMoneyValue.updatedAt = todayDate;
    });

    await queryInterface.bulkInsert(
      "treasure_money_values",
      treasuresMoneyValues,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */

    await queryInterface.bulkDelete("treasure_money_values", null, {});
  }
};
