// The files in this directory contain functions that handle requests coming to different routes

// These controller methods get the request from the routes and convert them to HTTP responses with the use of any middleware as necessary.

const user = require('../services/userdatabase.js');
const myFunc = require('../middleware/mymiddleware')
async function post(req, res, next) {
    try {
        res.json(await user.login());
    } catch (err) {
        console.error(`Error while posting login`, err.message);
        next(err);
    }
  }

  async function add(req, res, next) {
    try {
        res.json(await user.newUser());
    } catch (err) {
        console.error(`Error while adding new user`, err.message);
        next(err);
    }
  }

  async function patch(req, res, next) {
    try {
        res.json(await user.update());
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
  }

  async function del(req, res, next) {
    try {
        res.json(await user.delUser());
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
  }


module.exports = {post, add, patch, del}

