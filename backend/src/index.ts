import express, { Express, Request, Response } from "express";

import { createUser } from "./config/controllers/user.controller";
import { verifyToken } from "./middleware/auth";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import pointOfInterestRouter from "./routes/pointOfInterest.route";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Running Express + TS Server !!!");
});

app.post("/register", createUser);
app.use("/user", userRouter);
app.use("/pointOfInterest", pointOfInterestRouter);
app.use("/user/:userId/pointOfInterest/:poiId/posts", postRouter);
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});
