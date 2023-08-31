import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/User";
import { IUser } from "../../types";
import dotenv from "dotenv";

const getUserToken = (id: string) => {
  const authenticatedUserToken = jwt.sign(
    { id },
    process.env.SECRET_KEY as Secret,
    {
      expiresIn: "7d",
    }
  );
  return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      user_name,
      occupation,
      password,
      email,
      location,
      profile_image,
    }: IUser = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.send(409).send("User already exists");
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      user_name,
      password: hashedPassword,
      occupation,
      profile_image,
    });

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser:", error);
    return res.status(422).send("Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(409).send({ message: "User does not exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordIdentical) {
      const token = getUserToken(existingUser.id);
      delete existingUser.password;
      return res.send({
        token,
        existingUser,
      });
    } else {
      return res.status(400).send({ message: "Incorrect credentials" });
    }
  } catch (error) {
    console.log("Error in loginUser:", error);
    return res.status(500).send("Internal Server Error");
  }
};
