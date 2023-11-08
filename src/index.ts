import express, {Express, Response} from "express";

const PORT = 2989;

const app: Express = express();

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
