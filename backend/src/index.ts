import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("Running Express + TS Server !!!");
});

app.listen(port, () => {
    console.log(`server running : http://localhost:${port}`);
});