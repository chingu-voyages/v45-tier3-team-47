import { Request, Response } from "express";
import { PointOfInterest } from "../models/PointOfInterest";
import { User } from "../models/User";
import { IPointOfInterest } from "../../types";

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
    }: IPointOfInterest = req.body;

    const userId = req.body.user_id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json("User not found");
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
      // userId: user.id, // associate point of interest with a user
    });

    return res
      .status(201)
      .json({ message: "Point of interest created successfully" });
  } catch (error) {
    console.log("Error in createPointOfInterest:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getPointOfInterests = async (req: Request, res: Response) => {
  try {
    const pointOfInterests = await PointOfInterest.findAll();
    return res.status(200).json(pointOfInterests);
  } catch (error) {
    console.log("Error in getPointOfInterest:", error);
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

    await pointOfInterestToUpdate.save();

    return res
      .status(200)
      .json({ message: "Point of interest update successfully" });
  } catch (error) {
    console.log("Error in updatePointOfInterest:", error);
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
    console.log("Error in deletePointOfInterest:", error);
    return res.status(500).json("Internal Server Error");
  }
};
