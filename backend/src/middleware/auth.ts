import jwt, { Secret } from "jsonwebtoken";
import { UnauthorizedError } from "../expressError";
import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../types";

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization }: IAuthRequest = req.headers;
    if (authorization.startsWith("Bearer ")) {
      const token = authorization.slice(7).trimStart();
      res.locals.user = jwt.verify(token, process.env.SECRET_KEY as Secret);
    }
    return next();
  } catch (err) {
    return next();
  }
};


/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

export const ensureLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}


/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

export const ensureCorrectUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!(user &&
      (user.id === req.params.id) || (user.id === req.body.userId)
      )) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}
