import express, { Express, Request, Response } from "express";
// import { createUser } from "./config/controllers/user.controller";
// import { createUser } from "./config/controllers/user.controller";
// import { verifyToken } from "./middleware/auth";
// import userRouter from './src/routes/pointOfInterest.routes'
// import postRouter from './src/routes/post.routes';
import pointOfInterestRouter from './routes/pointOfInterest.routes';
// import { PointOfInterest } from "./config/models/PointOfInterest";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Running Express + TS Server !!!");
});


// app.post("/register", verifyToken, createUser);

// app.use('/user', userRouter);
// app.use('/post', postRouter);
app.use('/pointOfInterest', pointOfInterestRouter);

app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});
