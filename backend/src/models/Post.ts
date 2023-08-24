import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const Post = sequelize.define(
  "Post",
  {
    rating: {
      type: DataTypes.DECIMAL,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

Post.belongsTo(User);
Post.belongsTo(PointOfInterest);

export { Post };
