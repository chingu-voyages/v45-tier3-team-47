// associations.ts

import { User } from "./User";
import { PointOfInterest } from "./PointOfInterest";
import { Post } from "./Post";

User.hasMany(PointOfInterest, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });
PointOfInterest.belongsTo(User, { foreignKey: "userId" });
PointOfInterest.hasMany(Post, { foreignKey: "pointOfInterestId" });
Post.belongsTo(User, { foreignKey: "userId" });
Post.belongsTo(PointOfInterest, { foreignKey: "pointOfInterestId" });

export { User, PointOfInterest, Post };
