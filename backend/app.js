const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // import Socket.IO

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // wrap Express app
const io = new Server(server, {
  cors: { origin: "*" }, // allow requests from any origin for testing
});

require("./DB/mongoose");
const logger = require("./middleware/logger");
const routes = require("./Routes/index");

app.use(express.json());
app.use(logger);
app.use("/", routes);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a server room
  socket.on("joinServer", (serverId) => {
    socket.join(serverId);
    console.log(`Socket ${socket.id} joined room ${serverId}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// Export io so controllers can use it
module.exports = io;
