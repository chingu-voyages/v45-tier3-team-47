import express from "express";
import {
  loginUser,
  updateUser,
  getUserData,
} from "../controllers/user.controller";
import { ensureCorrectUser } from "../middleware/auth";

const userRouter = express.Router();
userRouter.post("/login", loginUser);

userRouter.patch("/update/:id", ensureCorrectUser, updateUser);
userRouter.get("/profile/:id", getUserData);

export default userRouter;
