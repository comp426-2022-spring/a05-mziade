// The files in this directory contain functions that handle requests coming to different routes

// These controller methods get the request from the routes and convert them to HTTP responses with the use of any middleware as necessary.

const log = require('../services/logdatabase.js');

async function get(req, res, next) {
    try {
        res.json(await log.getAll());
    } catch (err) {
        console.error(`Error while getting log`, err.message);
        next(err);
    }
  }

  async function error(req, res, next) {
    try {
        res.json(await log.error());
    } catch (err) {
        console.error(`Error test failed`, err.message);
        next(err);
    }
  }


module.exports = {get, error}

