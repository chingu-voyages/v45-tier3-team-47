// import { Sequelize } from "sequelize";
import { sequelize } from "../../config/db";
import { DataTypes, Model } from "sequelize";
import { PointOfInterest } from "./PointOfInterest";
import { Post } from "./Post";
import { IUser } from "../../types";

// const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

interface UserInterface extends Model<IUser>, IUser {}

const User = sequelize.define<UserInterface>(
  "User",
  {id: {
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
  }
);

// User.hasMany(Post);
// User.hasMany(PointOfInterest);

User.sync().then(() => {
  console.log("User Model synced");
});

export { User };
