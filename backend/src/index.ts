import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import dbConnect from "./config/database";
import cors from 'cors';

dotenv.config();

dbConnect();

const server: Express = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(cors({
    origin:'*'
}));

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.use("/auth", authRoutes);
server.use("/task", taskRoutes);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});