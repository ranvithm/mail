import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import MailService from "./helper";

dotenv.config();

const mailService = MailService.getInstance();
mailService.createConnection();

const app: Express = express();
const port = process.env.PORT;

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.get("*", (req: Request, res: Response) => {
  res.send("Ranjith deployed this apps");
});

module.exports = app;
