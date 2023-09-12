import express from "express";
const pointOfInterestRouter = express.Router();

import {
  getPointOfInterests,
  createPointOfInterest,
  updatePointOfInterest,
  deletePointOfInterest,
} from "../controllers/pointOfInterest.controller";

import { ensureLoggedIn } from "../middleware/auth";

pointOfInterestRouter.get("/", getPointOfInterests);
pointOfInterestRouter.post("/", createPointOfInterest);
pointOfInterestRouter.patch("/:id", ensureLoggedIn, updatePointOfInterest);
pointOfInterestRouter.delete("/:id", ensureLoggedIn, deletePointOfInterest);

export default pointOfInterestRouter;
