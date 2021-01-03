require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => res.json(req.headers));

module.exports = server;
