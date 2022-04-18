// Connect to user db
let User = require('/data/db/user.db')

const userRoutes = express.Router();
const userController = require('../controllers/usercontroller.js');
// how do I incorporate middlware, so it logs?
userRoutes.post('/app/log/login', userController.post);
userRoutes.user('/app/log/error', userController.post);
userRoutes.patch('/app/log/error', userController.patch);
userRoutes.del('/app/log/error', userController.delete);

module.exports = userRoutes;

