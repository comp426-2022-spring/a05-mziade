// Connect to user db
let User = require('/data/db/user.db')

const userRoutes = express.Router();

userRoutes.route('/app/user/login').post((req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
})

userRoutes.route('/app/user/new').post((req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
})

userRoutes.route('/app/user/update').patch((req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
})

userRoutes.route('/app/user/delete').delete((req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
})

module.exports = userRoutes;

