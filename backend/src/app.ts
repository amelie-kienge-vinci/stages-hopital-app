import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? "3000";

app.get("/", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

export default app;

