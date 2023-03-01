import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import MailService from "./helper";

dotenv.config();

const mailService = MailService.getInstance();
mailService.createConnection();

const app: Express = express();

const allowedOrigins = ["http://localhost:3000", "https://ranvithm.github.io", "https://ranvithm.vercel.app/"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.post("/sendMail", async (req: Request, res: Response) => {  
  const { name, mailId, message } = req.body;
  
  await mailService.sendMail({
    to: mailId,
    subject: name,
    text: message,
  });
  res.send("Ranjith deployed this apps");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("Vercel deployment is successfully done");
});

app.get("*", (req: Request, res: Response) => {
  res.send("Ranjith deployed this app");
});

module.exports = app;

// app.listen(5000, () => {
//   console.log("testing app");
// });
