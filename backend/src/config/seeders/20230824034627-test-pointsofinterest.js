"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PointOfInterest", [
      {
        title: "Niagara Falls",
        category: "Nature",
        description:
          "Group of three waterfalls at the southern end of Niagara Gorge spanning border between Ontario in Canada and New York in the US",
        longitude: "43.0799",
        latitude: "-79.0747",
        price: 0,
        city: "Niagara Falls",
        website: "https://www.niagarafallsstatepark.com/",
        post_code: "",
        province: "Ontario",
        country: "Canada",
        phone_number: "",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Machu Picchu",
        category: "Nature",
        description:
          "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.",
        longitude: "-13.2263",
        latitude: "-72.4973",
        price: 0,
        city: "Machupicchu District",
        website: "",
        post_code: "",
        province: "Cusco Region",
        country: "Peru",
        phone_number: "",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PointOfInterest", null, {});
  },
};
