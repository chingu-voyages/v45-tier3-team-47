"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PointOfInterest", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.DECIMAL,
      },
      latitude: {
        type: Sequelize.DECIMAL,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      city: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      post_code: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PointOfInterest");
  },
};
