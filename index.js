import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from "http";
import "dotenv/config";
import { router } from "./Routers/Routers.js";
import mongoose from "mongoose";

//DB connect
mongoose.connect("mongodb://localhost:27017");
// App setup # make express
const app = express();
app.use(morgan("combined")); // loggin framwork to log incoming request
app.use(bodyParser.json({ type: "*/*" })); // parsing framwork to parse incoming request to json
router(app);
//server set up
const port = process.env.portNumber || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening on ==>", port);
