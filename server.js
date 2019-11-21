const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./auth/authRouter");
const restricted = require("./auth/restrictedMiddleware");
const usersRouter = require("./users/usersRouter");
const mothersRouter = require("./mothers/mothersRouter");
const driversRouter = require("./drivers/driversRouter");
const labelsRouter = require("./labels/labelsRouter");
const smsRouter = require("./sms/smsRouter");
const odkRouter = require("./odk/odkrouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", restricted, usersRouter);
server.use("/mothers", restricted, mothersRouter);
server.use("/drivers", restricted, driversRouter);
server.use("/labels", restricted, labelsRouter);

//Unprotected Routes

//sms functionality
server.use("/sms", smsRouter);
//odk router
// server.use("/odk", odkRouter);

server.get("/", (req, res) => {
  res.json({ api: "safe mothers" });
});

module.exports = server;
