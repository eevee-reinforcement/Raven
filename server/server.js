/*
    uses express to serve static files and handle http requests, while socket.io enables real time 
    bidirectional communication between the server and clients. When a client connects, they can send and receive 
    messages in real time. socket listens for events like "chat message" and "disconnect," 
    and broadcasts messages to all connected clients.
 */

import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
// import routes from "./routes/api.js";


const app = express();
const PORT = 8080;

// create http server for both express and socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // should be port of front end 
    methods: ["GET", "POST"]
  }
}); // attach socket to http server



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.resolve("client")));

// mount API routes
// app.use('/api/auth', routes);

//socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // example of handling message event from client
  socket.on("chat message", (msg) => {
    console.log(`Message received: ${msg}`);
    //broadcast message to all connected clients
    io.emit("chat message", msg);
  });

  // handle user diconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// unknown middleware error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// server message
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
