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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helper_1 = __importDefault(require("./helper"));
dotenv_1.default.config();
const mailService = helper_1.default.getInstance();
mailService.createConnection();
const app = (0, express_1.default)();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get("/sendMail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mailService.sendMail({
        to: "ranvitranjit@gmail.com",
        subject: "Testing",
        text: "Hello",
    });
    res.send("Ranjith deployed this apps");
}));
app.get("/health", (req, res) => {
    res.send("Ranjith deployed this apps");
});
app.get("*", (req, res) => {
    res.send("Ranjith deployed this app");
});
module.exports = app;
