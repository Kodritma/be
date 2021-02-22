const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const errorHandler = require("../middlewares/errorHandler");

const playlistRouter = require("../data/routers/playlistRouter");
const videoRouter = require("../data/routers/videoRouter");
const googleAuthRouter = require("../data/routers/googleAuthRouter");
const userRouter = require("../data/routers/userRouter");
const uploadRouter = require("../data/routers/uploadRouter");

const options = { origin: process.env.FRONTEND, credentials: true };

server.use(cors(options));
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use(express.static("public"));

server.use("/playlists", playlistRouter);
server.use("/videos", videoRouter);
server.use("/auth", googleAuthRouter);
server.use("/user", userRouter);
server.use("/upload", uploadRouter);

server.get("/", (req, res) => {
  res.json(req.headers);
});

server.use(errorHandler);

module.exports = server;
