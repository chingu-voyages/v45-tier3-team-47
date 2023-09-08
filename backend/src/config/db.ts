import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: './.env' });

const database: string = process.env.DB_NAME || "sightseeshare_db";
const username: string = process.env.DB_USER || "default_username";
const password: string = process.env.DB_PASS || "default_password";
const host: string = process.env.DB_HOST || "127.0.0.1";
const port: string = process.env.DB_PORT || "5432";
const dialect: string = process.env.DB_DIALECT || "postgres";

const sequelize: Sequelize = new Sequelize(
  `${dialect}://${username}:${password}@${host}:${port}/${database}`
);

const testDbConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, testDbConnection };
