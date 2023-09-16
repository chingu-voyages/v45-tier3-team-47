import express from "express";
const postRouter = express.Router();
import {
  createPost,
  deletePost,
  getPosts,
  getPostsByPoi,
  getPostsByUser,
  updatePost,
} from "../controllers/post.controller";

postRouter.get("/", getPosts);
postRouter.get("/byPoi/:poiId", getPostsByPoi);
postRouter.get("/byUser/:userId", getPostsByUser);
postRouter.post("/", createPost);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
