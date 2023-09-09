import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import { createUser } from "./src/controllers/user.controller";
import { verifyToken } from "./src/middleware/auth";
import userRouter from "./src/routes/user.route";
import postRouter from "./src/routes/post.route";
import pointOfInterestRouter from "./src/routes/pointOfInterest.route";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Running Express + TS Server !!!");
});
app.use(helmet());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.post("/register", createUser);

app.use("/user", userRouter);
app.use("/pointOfInterest", pointOfInterestRouter);
app.use("/posts", postRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});
