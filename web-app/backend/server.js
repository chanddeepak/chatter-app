import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 8000;


// const server = require("http").Server(app);
// const io = require("socket.io")(server);

dotenv.config();

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes); 

// app.use(express.static(__dirname + '/public'));

// io.on("connection", (socket) => {
//     // Handle user connection and disconnection
//     socket.on("join room", (roomName) => {
//       // Join a chat room and broadcast to other users
//       console.log('')
//     });
  
//     socket.on("send message", (message) => {
//       // Store the message in the database and broadcast it to other users
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//       });
    
//     socket.on('message', (message) => {
//         console.log('Received message:', message);
//         io.emit('message', message);
//     });

// });

// app.get("/", (req, res) => {
//   res.send("Hello world")
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`listening on *:${PORT}`);
});