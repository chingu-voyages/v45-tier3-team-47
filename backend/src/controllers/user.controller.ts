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
      email,
      password,
      location,
      profile_image,
    }: IUser = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      user_name,
      email,
      password: hashedPassword,
      occupation,
      location,
      profile_image,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser:", error);
    return res.status(422).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {
      email: inputEmail,
      password: inputPassword
    }: IUser = req.body;

    const {
      id,
      first_name,
      last_name,
      user_name,
      occupation,
      password,
      email,
      location,
      profile_image
    } = await User.findOne({ where: { email: inputEmail } });

    if (!email) {
      return res.status(409).json({ message: "User does not exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      inputPassword,
      password
    );

    if (isPasswordIdentical) {
      const token = getUserToken(id);
      return res.json({
        token,
        existingUser: {
          id,
          first_name,
          last_name,
          user_name,
          occupation,
          email,
          location,
          profile_image
        },
      });
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

    return res.status(202).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error in updateUser:", error);
    return res.status(500).json("Internal Server Error");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });

    console.log(user);

    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json("Internal Server Error");
  }
};
