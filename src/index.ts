import express, {Express, Response} from "express";

const PORT = 2989;

const app: Express = express();

app.use((req, res, next) => {

  const allowedIP = process.env.PAGE_IP;
  const header = req.headers;
  console.log(`Assumed IP: ${req.headers['x-forwarded-for']}`);
  console.log(header);

  //TODO: block other than allwed IP and set it to the env value
  if (req.ip !== allowedIP || req.ip !== "::1") {
    console.log("[IP]: ", req.ip);
  }

  res.header('Access-Control-Allow-Origin', '*'); // SECOND FIELD - process.env.PAGE_IP
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, AUTHORIZATION');
  next();
});

app.listen(PORT, () => {
  console.log(`The web server is running at the port: ${PORT}`);
  const tempToken = process.env.TEMP_TOKEN || "not detected";
  console.log(`Token: ${tempToken}`);
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
  console.log("IP", q.ip);
  console.log(message);
  res.end(message);
});
