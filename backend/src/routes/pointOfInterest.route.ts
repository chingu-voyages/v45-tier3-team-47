import express from "express";
const pointOfInterestRouter = express.Router();

import {
  getPointOfInterests,
  createPointOfInterest,
  updatePointOfInterest,
  deletePointOfInterest,
} from "../controllers/pointOfInterest.controller";

import { verifyToken } from "../middleware/auth";

pointOfInterestRouter.get("/", getPointOfInterests);
pointOfInterestRouter.post("/", verifyToken,createPointOfInterest);
pointOfInterestRouter.patch("/:id", updatePointOfInterest);
pointOfInterestRouter.delete("/:id", deletePointOfInterest);

export default pointOfInterestRouter;
