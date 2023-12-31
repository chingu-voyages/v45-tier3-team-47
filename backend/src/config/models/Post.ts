import { sequelize } from "../../config/db";
import { DataTypes, Model } from "sequelize";
import { IPost } from "../../types";

interface PostInterface extends Model<IPost>, IPost {}

const Post = sequelize.define<PostInterface>(
  "Post",
  {
    rating: {
      type: DataTypes.DECIMAL,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pointOfInterestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Post",
  }
);

export { Post };
