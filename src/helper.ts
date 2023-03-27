import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import mailHtmlData from "./mail";

export default class MailService {
  private static instance: MailService;
  private transporter!: nodemailer.Transporter;

  private constructor() {}
  //INSTANCE CREATE FOR MAIL
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  //CREATE A CONNECTION FOR LIVE
  async createConnection() {
    const { SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USERNAME, SMTP_PASSWORD } =
      process.env;
    // console.log(SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USERNAME, SMTP_PASSWORD);

    if (SMTP_HOST && SMTP_PORT && SMTP_TLS && SMTP_USERNAME && SMTP_PASSWORD)
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_TLS,
        auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
        },
      } as unknown as SMTPTransport.Options);
  }
  //SEND MAIL
  async sendMail(options: any) {
    const { SMTP_SENDER } = process.env;
    const htmlData = await mailHtmlData(options.subject);

    this.transporter
      .sendMail({
        from: SMTP_SENDER || options.from,
        to: options.to,
        bcc: "ranvithm@gmail.com",
        subject: options.subject,
        html: htmlData,
      })
      .then((info) => {
        console.log(info);

        return info;
      });
    return await this.transporter
      .sendMail({
        from: SMTP_SENDER || options.from,
        to: "ranvithm@gmail.com",
        subject: options.subject,
        text: options.text,
      })
      .then((info) => {
        console.log(info);

        return info;
      });
  }
  //VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }
  //CREATE TRANSPORTER
  getTransporter() {
    return this.transporter;
  }
}
