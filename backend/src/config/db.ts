import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: './.env' });

const database: string = process.env.DB_NAME || "sightseeshare_db";
const username: string = process.env.DB_USER;
const host: string = process.env.DB_HOST || "127.0.0.1";
const port: string = process.env.DB_PORT || "5432";
const dialect: string = process.env.DB_DIALECT || "postgres";

let sequelize: Sequelize;

if (process.env.DB_PASS) {
  // If DB_PASS is truthy (not an empty string or undefined)
  const password: string = process.env.DB_PASS;

  sequelize = new Sequelize(
    `${dialect}://${username}:${password}@${host}:${port}/${database}`
  );
} else {
  // If DB_PASS is falsy (empty string or undefined)
  sequelize = new Sequelize({
    database: "sightseeshare_db",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  });
}

const testDbConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, testDbConnection };
