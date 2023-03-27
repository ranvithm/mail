"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_1 = __importDefault(require("./mail"));
class MailService {
    constructor() { }
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE A CONNECTION FOR LIVE
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const { SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USERNAME, SMTP_PASSWORD } = process.env;
            // console.log(SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USERNAME, SMTP_PASSWORD);
            if (SMTP_HOST && SMTP_PORT && SMTP_TLS && SMTP_USERNAME && SMTP_PASSWORD)
                this.transporter = nodemailer_1.default.createTransport({
                    host: SMTP_HOST,
                    port: SMTP_PORT,
                    secure: SMTP_TLS,
                    auth: {
                        user: SMTP_USERNAME,
                        pass: SMTP_PASSWORD,
                    },
                });
        });
    }
    //SEND MAIL
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SMTP_SENDER } = process.env;
            const htmlData = yield (0, mail_1.default)(options.subject);
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
            return yield this.transporter
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
        });
    }
    //VERIFY CONNECTION
    verifyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transporter.verify();
        });
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService;
