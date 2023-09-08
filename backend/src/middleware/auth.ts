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
    // if (!authorization) return res.status(403).send("Access Denied");

    if (authorization.startsWith("Bearer ")) {
      const token = authorization.slice(7).trimStart();
      // const verified = jwt.verify(token, process.env.SECRET_KEY as Secret);
      res.locals.user = jwt.verify(token, process.env.SECRET_KEY as Secret);
      console.log(res.locals);

      // next();
    }
    return next();
    // else {
    //   return res.status(403).send("Access Denied");
    // }
  } catch (err) {
    // res.status(500).json({ error: err.message });
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
    console.log("YOU ARE IN ENSURE LOGGED IN !!");
    console.log(res.locals.user);
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
    // console.log(Object.keys(res));
    // console.log(res);
    console.log(res.locals);
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
