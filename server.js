// ?\imports
// enviromenent
require("dotenv").config();

// third party imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");

// first party imports
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const rateLimiter = require("./middleware/rateLimiter");
const db = require("./database");

const app = express();

if (process.env.NODE_ENV === "production") {
  // const helmet = require("helmet");
  // const rateLimit = require("express-rate-limit");
  // // const rateLimit = require("express-rate-limit");

  // const rateLimiter = rateLimit({
  //   windowMS: 15 * 60 * 1000,
  //   max: 100,
  // });

  app.use(helmet());
  app.use(rateLimiter);
}

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3500;

app.use(logger);
// app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
// app.use(helmet());

// routes
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); //HTML formData
// app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// app.use("/", rateLimiter);

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// ***
// app.use(verifyJWT);
// ***
app.use("/employees", require("./routes/api/employees"));
app.use("/chat", require("./routes/chat"));
app.use("/projects", require("./routes/projects"));
app.use("/skills", require("./routes/employeeSkills"));
app.use(errorHandler);

app.get(/\/*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404, JSON not found" });
  } else if (req.accepts("txt")) {
    res.type({ error: "404, text not found" });
  }
  // res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

// // ************************* page 13
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;

//   if (!token) {
//     return next(new Error("Authentication error: No token provided"));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     socket.user = decoded;
//     next();
//   } catch (err) {
//     return next(new Error("Authentication error: Invalid token"));
//   }
// });
// ************************* page 13

io.on("connection", (socket) => {
  console.log("WebSocket connected: ", socket.id);

  socket.on("chatMessage", (msg) => {
    const user = socket.user?.username || "Anonymous";
    console.log("Message received: ", msg);

    io.emit("chatMessage", { user, message: msg });
  });

  socket.on("sendNotification", (msg) => {
    io.emit("notification", msg);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected successfully");
  });
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on(`SIGINT`, () => {
  try {
    db.close();
    console.log("Database connection is closed");
  } catch (err) {
    console.error("Failed to close database connection", err.message);
  } finally {
    process.exit(0);
  }
});

// install npm install -g pm2
// start server.js -- --name=serveren
// pm2 stop server
// npm install --save-dev jest supertest (this has been deprecated)
// npm uninstall jest supertest
