import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import { createUser } from "./src/controllers/user.controller";
import { verifyToken } from "./src/middleware/auth";
import userRouter from "./src/routes/user.route";
import postRouter from "./src/routes/post.route";
import pointOfInterestRouter from "./src/routes/pointOfInterest.route";
import { NotFoundError } from "./src/expressError";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Running Express + TS Server !!!");
});
app.use(helmet());
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(verifyToken);


app.post("/register",createUser);

app.use("/user", userRouter);
app.use("/pointOfInterest", pointOfInterestRouter);
app.use("/posts", postRouter);


/** Handle 404 errors -- this matches everything */
app.use((
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Using 'any' to access the 'status' property
  const status = (err as any).status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});
