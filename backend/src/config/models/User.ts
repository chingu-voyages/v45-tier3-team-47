import { sequelize } from "../../config/db";
import { DataTypes, Model } from "sequelize";
import { Post } from "./Post";
import { PointOfInterest } from "./PointOfInterest";
import { IUser } from "../../types";

interface UserInterface extends Model<IUser>, IUser {}

const User = sequelize.define<UserInterface>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "User",
  }
);

User.sync().then(() => {
  console.log("User Model synced");
});

export { User };
