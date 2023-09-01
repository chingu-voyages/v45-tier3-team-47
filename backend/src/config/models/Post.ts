import { sequelize } from "../../config/db";
import { DataTypes } from "sequelize";
import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";

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
