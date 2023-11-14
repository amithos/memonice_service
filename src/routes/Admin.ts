import {Router} from "express";
import config from "../config";
import AdminConnectionObserver from "../services/main_stream/AdminConnectionObserver/AdminConnector";


const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || config.ADMIN_PASSWORD;
const router = Router();

router.get("/", (req, res) => {
  const connection = new AdminConnectionObserver();
  res.send(`Connection status: ${connection.getConnectionStatus() ? "✔️" : "❌"}`);
});

router.get("/:token")

router.post("/", (req, res) => {
  const connection = new AdminConnectionObserver();
  let isConnectionEsteblished = false;

  try {
    isConnectionEsteblished = req.body.password === "test";  //ADMIN_PASSWORD;
    console.log("admin connection: ", isConnectionEsteblished);
    const clientIdentifier = connection.markConnectionEstablished();

    res.cookie("client-identifier", clientIdentifier); //{httpOnly: true});
    console.log(clientIdentifier);

    
  } catch (err) {
    console.log(err);
    connection.markConnectionTerminated();
  }

  res.json({status: isConnectionEsteblished});
});

export default router;
