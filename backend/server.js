// Imports
import jsonServer from "json-server";
import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";

// Express app setup
const app = express();
const server = http.createServer(app);

// Adding CORS middleware

app.use(cors());

// Adding json server middleware

const middlewares = jsonServer.defaults();
const router = jsonServer.router("db.json");

app.use(middlewares);
app.use(router);

// Setting the port and starting the server

const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "https://mop-react-frontend.netlify.app/",
    methods: ["GET", "POST"],
  },
});

// The below array stores currently connected users in the form userId: socketId
let onlineUsers = [];

// Adds a new user to the array above, but only if entry not exist
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

// Removes an user from the array above using socketId
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// Returns an user from the array above using userId
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// Defining event for the io object
io.on("connection", (socket) => {
  // Adds a new user
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
    console.log(onlineUsers);
  });

  socket.on(
    "notification",
    ({ id, recipientId, questionId, authorId, read, datetime }) => {
      const receiver = getUser(recipientId);
      if (!receiver) return;

      io.to(receiver.socketId).emit("notification", {
        id,
        recipientId,
        questionId,
        authorId,
        read,
        datetime,
      });
    }
  );

  // Removes an user
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT);
