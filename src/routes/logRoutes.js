//Connect to log db
const express = require("express");
const logRoutes = express.Router();
const logController = require('../controllers/logcontroller.js');
logRoutes.get('/app/log/access', logController.get);
logRoutes.get('/app/log/error', logController.error);

module.exports = logRoutes;