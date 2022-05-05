// Connect to user db
var express = require('express')
const userRoutes = express.Router();
const userController = require('../controllers/usercontroller.js');
// how do I incorporate middlware, so it logs?
userRoutes.post('/app/userlogin', userController.post);
userRoutes.post('/app/user/new', userController.add);
userRoutes.patch('/app/user/update', userController.patch);
userRoutes.delete('/app/user/delete', userController.del);

module.exports = userRoutes;

