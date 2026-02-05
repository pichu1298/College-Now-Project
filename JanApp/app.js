import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);

const routes = require("./Routes/index");

app.use("/", routes);
app.use(express.json()); // -> converts things to json for us

// import { Server } from "socket.io";
// const io = new Server({});

// io.on("connection", (socket) => {
//   //...
// });

// io.listen(3000);

// const express = require("express");
// const port = process.env.PORT || 3000; //using a different port
// const app = express();
// const routes = require("./Routes/index");
// app.use(express.json()); // -> converts things to json for us

// app.use("/", routes); // any URL route in the application is going to use the stuff in .Routes/index file.

// app.listen(port, () => {
//   console.log(`Server is up on port ${port}`);
// });
