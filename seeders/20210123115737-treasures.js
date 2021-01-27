"use strict";
const treasures = require("../public/data/treasures.json");
const todayDate = new Date()
  .toISOString()
  .replace(/T/, " ")
  .replace(/\..+/, "");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    treasures.map(treasure => {
      treasure.createdAt = treasure.updatedAt = todayDate;
    });

    await queryInterface.bulkInsert("treasures", treasures, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */

    await queryInterface.bulkDelete("treasures", null, {});
  }
};
