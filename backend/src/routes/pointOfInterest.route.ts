import express from "express";
const pointOfInterestRouter = express.Router();

import {
  getPointOfInterests,
  createPointOfInterest,
  updatePointOfInterest,
  deletePointOfInterest,
} from "../config/controllers/pointOfInterest.controller";

import { verifyToken } from "../middleware/auth";

pointOfInterestRouter.get("/", getPointOfInterests);
pointOfInterestRouter.post("/", verifyToken, createPointOfInterest);
pointOfInterestRouter.patch("/:id", verifyToken, updatePointOfInterest);
pointOfInterestRouter.delete("/:id", verifyToken, deletePointOfInterest);

export default pointOfInterestRouter;
