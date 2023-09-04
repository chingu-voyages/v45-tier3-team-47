import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import multer , { FileFilterCallback }from 'multer';
import { createUser } from "./src/controllers/user.controller";
import { verifyToken } from "./src/middleware/auth";
import userRouter from "./src/routes/user.route";
import postRouter from "./src/routes/post.route";
import pointOfInterestRouter from "./src/routes/pointOfInterest.route";
import path  from "path";
import { fileURLToPath } from 'url';
// const __meta = { url: require('url').pathToFileURL(__filename).href }
// Object.setPrototypeOf(__meta, null)


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



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
app.use('/public/assets', express.static(path.join(__dirname, 'public/assets')));

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination(req:Request,file:Express.Multer.File,cb:DestinationCallback){
    cb(null,"public/assets");
  },
  filename(req:Request,file:Express.Multer.File,cb:FileNameCallback){
    cb(null, file.originalname);
  }
})
const upload = multer({storage});


app.post("/register",upload.single("profile_image"), createUser);
app.use("/user", userRouter);
app.use("/pointOfInterest", pointOfInterestRouter);
app.use("/user/:userId/pointOfInterest/:poiId/posts", postRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`server running : http://localhost:${port}`);
});
