"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("PointOfInterest", {
      fields: ["userId"],
      type: "foreign key",
      references: {
        table: "User",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("PointOfInterest", "fk_user_id");
  },
};
