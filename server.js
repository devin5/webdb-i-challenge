const express = require("express");
const accountsRouter = require("./Routes/accountsRouter");

const server = express();

server.use(express.json());
server.use("/accounts", accountsRouter);

module.exports = server;
