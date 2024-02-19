const express = require("express");
require("dotenv").config();
const { db } = require("./db/db.connect");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on("sendNotification", (data) => {
    io.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

db();
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};
app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
