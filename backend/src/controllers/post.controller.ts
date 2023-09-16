import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { IPost } from "../types";
import { Post } from "../config/models/Post";
import { User } from "../config/models/User";
import { PointOfInterest } from "../config/models/PointOfInterest";

export const createPost = async (req: Request, res: Response) => {
  const poiId = req.body.pointOfInterestId;
  const pointOfInterest = await PointOfInterest.findByPk(poiId);

  if (!pointOfInterest) {
    return res.status(404).json({ message: "Point of Interest not found" });
  }

  try {
    console.log("Received request with body: ", req.body);
    console.log("Received request with headers: ", req.headers);

    const { rating, comment, userId, pointOfInterestId }: IPost = req.body;

    const user = await User.findByPk(userId);
    console.log("Fetched user:", user);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json("User not found");
    }

    const poi = await PointOfInterest.findByPk(pointOfInterestId);
    console.log("Fetched point of interest:", poi);
    if (!poi) {
      console.log("Point of Interest not found for ID:", pointOfInterestId);
      return res.status(404).json("Point of Interest not found");
    }

    const newPost = await Post.create({
      rating,
      comment,
      userId: user.id,
      pointOfInterestId: poi.id,
    });

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log("Error in createPost", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPosts", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getPostsByPoi = async (req: Request, res: Response) => {
  try {
    const postsByPoi = await Post.findAll({
      where: {
        pointOfInterestId: req.params.poiId,
      },
    });

    return res.status(200).json(postsByPoi);
  } catch (error) {
    console.log("Error in getPostsByPoi", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const postsByUser = await Post.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    return res.status(200).json(postsByUser);
  } catch (error) {
    console.log("Error in getPostsByUser", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { rating, comment }: IPost = req.body;

    const postToUpdate = await Post.findByPk(postId);

    if (!postToUpdate) {
      return res.status(404).json("Post not found");
    }
    postToUpdate.rating = rating;
    postToUpdate.comment = comment;
    await postToUpdate.save();

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.log("Error in updatePost:", error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const postToDelete = await Post.findByPk(postId);
    if (!postToDelete) {
      return res.status(404).json("Post not found");
    }
    await postToDelete.destroy();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost:", error);
    return res.send(500).json("Internal Server Error");
  }
};
