'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      first_name: "James",
      last_name: "Smith",
      user_name: "testUser1",
      email: "james@mail.com",
      occupation: "plumber",
      location: "New Orleans",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: "Mary",
      last_name: "Jane",
      user_name: "testUser2",
      email: "mary@mail.com",
      occupation: "actress",
      location: "Madrid",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: "Fred",
      last_name: "Williams",
      user_name: "testUser3",
      email: "fred@mail.com",
      occupation: "doctor",
      location: "Oslo",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};