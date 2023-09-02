import express from "express";
const pointOfInterestRouter = express.Router();

import { createPointOfInterest, getPointOfInterests, updatePointOfInterest, deletePointOfInterest } from "../config/controllers/pointOfInterest.controller";

import { verifyToken } from "../middleware/auth";

pointOfInterestRouter.post('/', verifyToken, createPointOfInterest);
pointOfInterestRouter.post('/', createPointOfInterest);
pointOfInterestRouter.patch('/:id', verifyToken, updatePointOfInterest);
pointOfInterestRouter.delete('/:id', verifyToken, deletePointOfInterest);

export default pointOfInterestRouter;