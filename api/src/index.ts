import "./config/DataBaseConfig";
import express from "express";
import { config } from "dotenv";

import authRouter from "./routes/authRoutes";

config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("listening on port " + port));
