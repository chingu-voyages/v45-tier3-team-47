import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../config/models/User";
import { IUser } from "../types";


const getUserToken = (id: number) => {
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
      // profile_image,
    }: IUser = req.body;
    const picture = req.file;
    if (!picture) {
      return res.status(400).json("Profile image is required");
    }


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      user_name,
      password: hashedPassword,
      occupation,
      email,
      location,
      profile_image:picture.path,
    });


    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser:", error);
    return res.status(422).json("Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    console.log("ree",req.body)
    const existingUser = await User.findOne({ where: { email } });
    console.log("User lookup result:", existingUser);
    if (!existingUser) {
      return res.status(409).json({ message: "User does not exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordIdentical) {
      const token = getUserToken(existingUser.id);
      delete existingUser.password;
      return res.json({
        token,
        existingUser,
      });
      console.log("token",token)
    } else {
      return res.status(400).json({ message: "Incorrect credentials" });
    }
  } catch (error) {
    console.log("Error in loginUser:", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser: IUser = req.body;
    const userToUpdate = await User.findByPk(userId);

    if (!userToUpdate) {
      return res.status(404).json("User not found");
    }

    userToUpdate.first_name = updatedUser.first_name;
    userToUpdate.last_name = updatedUser.last_name;
    userToUpdate.user_name = updatedUser.user_name;
    userToUpdate.occupation = updatedUser.occupation;
    userToUpdate.email = updatedUser.email;
    userToUpdate.location = updatedUser.location;
    userToUpdate.profile_image = updatedUser.profile_image;

    await userToUpdate.save();

    return res.status(202).json({ message: "User updated successfully" })
  } catch (error) {
    console.log("Error in updateUser:", error);
    return res.status(500).json("Internal Server Error");
  }
};
