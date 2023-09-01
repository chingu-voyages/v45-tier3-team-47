import express  from "express";
const router = express.Router();
import { loginUser } from "../config/controllers/user.controller";
router.post('/login',loginUser)

export  default router;