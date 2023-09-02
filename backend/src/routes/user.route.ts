import express from "express";
const userRouter = express.Router();
import { loginUser } from "../config/controllers/user.controller";
userRouter.post('/login', loginUser)

export default userRouter;