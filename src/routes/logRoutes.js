//Connect to log db
const express = require("express");
const logRoutes = express.Router();
const logController = require('../controllers/logcontroller.js');
const myFunc = function(req, res, next) {
	let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    };
    const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    next()
    res.status(200).json(info)
    }
// how do I incorporate middlware, so it logs?
logRoutes.get('/app/log/access', myFunc, logController.get);
logRoutes.get('/app/log/error', logController.error);

module.exports = logRoutes;