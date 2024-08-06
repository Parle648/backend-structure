var express = require("express");
var ee = require('events');

const applicationApi = require("./api/api");
const validateEnv = require("./helpers/validateEnv");
const gracefulShutdown = require("./services/shotdawn");
var app = express();

validateEnv();

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  gracefulShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  gracefulShutdown();
});

var port = 4066;

var statEmitter = new ee();

app.use(express.json());

app.use('/', applicationApi(express.Router))

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  statEmitter.on('newUser', () => {
    stats.totalUsers++;
  });
  statEmitter.on('newBet', () => {
    stats.totalBets++;
  });
  statEmitter.on('newEvent', () => {
    stats.totalEvents++;
  });

  console.log(`App listening at http://localhost:${port}`);
});

// Do not change this line
module.exports = { app, server };
