"use strict";
const bcrypt = require("bcrypt");
const users = require("../public/data/users.json");
const todayDate = new Date()
  .toISOString()
  .replace(/T/, " ")
  .replace(/\..+/, "");
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    users.map(user => {
      user.createdAt = user.updatedAt = todayDate;
      user.password = bcrypt.hashSync(user.password, saltRounds);
    });

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */

    await queryInterface.bulkDelete("users", null, {});
  }
};
