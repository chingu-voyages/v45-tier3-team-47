import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Running Express + TS Server !!!");

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});