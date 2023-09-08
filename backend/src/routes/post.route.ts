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
import { ensureCorrectUser } from "../middleware/auth";

postRouter.get("/", getPosts);
postRouter.get("/byPoi/:poiId", getPostsByPoi);
postRouter.get("/byUser/:userId", getPostsByUser);
postRouter.post("/", ensureCorrectUser, createPost);
postRouter.patch("/:id", ensureCorrectUser, updatePost);
postRouter.delete("/:id", ensureCorrectUser, deletePost);

export default postRouter;
