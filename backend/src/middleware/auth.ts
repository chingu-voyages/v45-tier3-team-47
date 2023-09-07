import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../types";


export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization }: IAuthRequest = req.headers;
    if (!authorization) return res.status(403).send("Access Denied");

    if (authorization.startsWith("Bearer ")) {
      const token = authorization.slice(7).trimStart();
      const verified = jwt.verify(token, process.env.SECRET_KEY as Secret);

      next();
    } else {
      return res.status(403).send("Access Denied");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
