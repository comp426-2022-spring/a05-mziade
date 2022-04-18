// Connect to user db

const userRoutes = express.Router();
const userController = require('../controllers/usercontroller.js');
// how do I incorporate middlware, so it logs?
userRoutes.post('/app/userlogin', userController.post);
userRoutes.user('/app/user/new', userController.post);
userRoutes.patch('/app/user/update', userController.patch);
userRoutes.del('/app/user/delete', userController.del);

module.exports = userRoutes;

