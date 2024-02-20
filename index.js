const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://master--dapper-chebakia-af5dff.netlify.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
const io = socketIo(server, {
  cors: {
    origin: corsOptions.origin,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("sendNotification", (data) => {
    io.emit("notification", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
