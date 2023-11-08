"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 2989;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`The web server is running at the port: ${PORT}`);
});
app.get("/", (q, res) => {
    res.end("Is it working?");
});
const formatMessage = (text) => `data: ${text}\n\n`;
let stream;
app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader('Connection', "keep-alive");
    console.log("stream: connected");
    stream = res;
    stream.write(formatMessage("connected"));
});
app.get("/send", (req, res) => {
    console.log("request");
    const message = req.query.m;
    typeof message === "string"
        ? stream.write(formatMessage(message))
        : console.log("The message is wrong:", req.query);
});
