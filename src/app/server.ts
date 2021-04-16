import express, { Request, Response } from "express";
import config from "./config/config";
  
const app = express();
const PORT = config.server.port;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {});

//Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at PORT: ${PORT}`);
});

export default app;