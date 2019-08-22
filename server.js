const express = require('express');

const AcctRouter = require('./accounts/account-router.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AcctRouter);


module.exports = server;