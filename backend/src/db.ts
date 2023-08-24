import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "db_name",
  host: "localhost",
  dialect: "postgres",
});

export { sequelize };
