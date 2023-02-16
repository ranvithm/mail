import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import MailService from "./helper";
import ServerlessHttp from "serverless-http";

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



app.post("/mail", async (req: Request, res: Response) => {
  const data = req.body;
  const _info = await mailService.sendMail({
    to: "ranvitranjit@gmail.com",
    subject: `${data.name} - ${data.mailId}`,
    text: data.message,
  });
  console.log(_info);
  
  res.send({ message: "Mail send success" });
});

app.get("*", (req: Request, res: Response) => {
  res.send("Ranjith deployed this app");
});

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

module.exports = app;
module.exports.handler = ServerlessHttp(app);
