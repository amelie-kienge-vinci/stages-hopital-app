import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import demandeRouter from "./demandes/demandeRouter";
import setupSwagger from "./swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? "3000";

app.get("/", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});
app.use("/api/demandes", demandeRouter);

setupSwagger(app);

export default app;

