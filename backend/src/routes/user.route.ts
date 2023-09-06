import express from "express";
import { loginUser, updateUser ,createUser } from "../controllers/user.controller";

const userRouter = express.Router();
userRouter.post('/login', loginUser);

userRouter.patch('/update/:id', updateUser);

export default userRouter;