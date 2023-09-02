import express from "express";
const postRouter = express.Router();
import { createPost, deletePost, getPosts, updatePost } from "../config/controllers/post.controller";
import { verifyToken } from "../middleware/auth";

postRouter.get('/', getPosts)
postRouter.post('/', verifyToken, createPost);
postRouter.patch('/:id', verifyToken, updatePost);
postRouter.delete('/:id', verifyToken, deletePost);

export default postRouter;