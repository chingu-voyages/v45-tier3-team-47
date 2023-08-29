import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Post } from "./Post";
import { User } from "./User";

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const PointOfInterest = sequelize.define("PointOfInterest", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.DECIMAL,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
});

PointOfInterest.hasMany(Post);
PointOfInterest.belongsTo(User);

export { PointOfInterest };