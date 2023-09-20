import { Request, Response } from "express";
import { PointOfInterest } from "../config/models/PointOfInterest";
import { User } from "../config/models/User";
import { IPointOfInterest } from "../types";

export const createPointOfInterest = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      longitude,
      latitude,
      price,
      city,
      category,
      website,
      post_code,
      province,
      country,
      phone_number,
      userId

    }: IPointOfInterest = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }



    const newPointOfInterest = await PointOfInterest.create({
      title,
      description,
      longitude,
      latitude,
      price,
      city,
      category,
      website,
      post_code,
      province,
      country,
      phone_number,
      userId,
    });


    return res
      .status(201)
      .json({ message: "Point of interest created successfully" });
  } catch (error) {
    console.error("Error in createPointOfInterest:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getPointOfInterests = async (req: Request, res: Response) => {
  try {
    const pointOfInterests = await PointOfInterest.findAll();
    return res.status(200).json(pointOfInterests);
  } catch (error) {
    console.error("Error in getPointOfInterest:", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updatePointOfInterest = async (req: Request, res: Response) => {
  try {
    const pointOfInterestId = req.params.id;
    const updatedPointOfInterest: IPointOfInterest = req.body;

    const pointOfInterestToUpdate = await PointOfInterest.findByPk(
      pointOfInterestId
    );

    if (!pointOfInterestToUpdate) {
      return res.status(404).json("Point of interest not found");
    }

    pointOfInterestToUpdate.title = updatedPointOfInterest.title;
    pointOfInterestToUpdate.category = updatedPointOfInterest.category;
    pointOfInterestToUpdate.description = updatedPointOfInterest.description;
    pointOfInterestToUpdate.longitude = updatedPointOfInterest.longitude;
    pointOfInterestToUpdate.latitude = updatedPointOfInterest.latitude;
    pointOfInterestToUpdate.price = updatedPointOfInterest.price;
    pointOfInterestToUpdate.city = updatedPointOfInterest.city;
    pointOfInterestToUpdate.website = updatedPointOfInterest.website;
    pointOfInterestToUpdate.post_code = updatedPointOfInterest.post_code;
    pointOfInterestToUpdate.province = updatedPointOfInterest.province;
    pointOfInterestToUpdate.country = updatedPointOfInterest.country;
    pointOfInterestToUpdate.phone_number = updatedPointOfInterest.phone_number;
    pointOfInterestToUpdate.userId = updatedPointOfInterest.userId;

    await pointOfInterestToUpdate.save();

    return res
      .status(200)
      .json({ message: "Point of interest updated successfully" });
  } catch (error) {
    console.error("Error in updatePointOfInterest:", error);
    return res.status(500).json("Internal Server Erorr");
  }
};

export const deletePointOfInterest = async (req: Request, res: Response) => {
  try {
    const pointOfInterestId = req.params.id;

    const pointOfInterestToDelete = await PointOfInterest.findByPk(
      pointOfInterestId
    );

    if (!pointOfInterestToDelete) {
      return res.status(404).json("Point of interest not found");
    }

    await pointOfInterestToDelete.destroy();

    return res
      .status(200)
      .json({ message: "Point of interest deleted successfully" });
  } catch (error) {
    console.error("Error in deletePointOfInterest:", error);
    return res.status(500).json("Internal Server Error");
  }
};
