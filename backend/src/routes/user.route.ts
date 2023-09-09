import express from "express";
import {
  loginUser,
  updateUser,
  createUser,
  getUserData,
} from "../controllers/user.controller";

const userRouter = express.Router();
userRouter.post("/login", loginUser);

userRouter.patch("/update/:id", updateUser);
userRouter.get("/profile/:id", getUserData);

export default userRouter;
