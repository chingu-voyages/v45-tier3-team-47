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
pointOfInterestRouter.post("/",  createPointOfInterest);
pointOfInterestRouter.patch("/:id", verifyToken, updatePointOfInterest);
pointOfInterestRouter.delete("/:id", verifyToken, deletePointOfInterest);

export default pointOfInterestRouter;
