import express, {Express, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import adminRouter from "./routes/Admin";
import { Paths } from "./constants/Paths";

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;
const CUSTOM_HEADER = process.env.CUSTOM_HEADER;
const HOST = process.env.HOST;

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //maybe set origin of gh-page
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, AUTHORIZATION');
  next();
});


app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`The web server is running at the port: ${PORT}`);
});

app.get("/", (q, res) => {
  res.end("Is it working?");
});

const formatMessage = (text: String) => `data: ${text}\n\n`; 
let stream: Response;

app.get("/stream", (req, res: Response) => {
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

app.get("/log", (q, res) => {
  const message = `[LOG]: ${q.query.m || "There is no message :/"}`;
  //console.log(`Is it the right host: ${q.headers.host === HOST}`);
  console.log(message, "↓↓↓↓↓");
  console.log(q);
  res.end(message);
});
