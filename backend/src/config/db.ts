import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "sightseeshare_db",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { sequelize, testDbConnection };