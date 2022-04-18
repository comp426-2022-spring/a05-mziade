// Route (endpoint) definitions go in this directory

const express = require("express");
const coinRoutes = express.Router();

function coinFlip() {
	return Math.random() > 0.5 ? ("heads") : ("tails")
}


function coinFlips(flips) {
	const arr = []
	for(let i = 1; i <= flips; i++) {
	  arr.push(Math.random() > 0.5 ? ("heads") : ("tails"))
	}
	return arr
}

function countFlips(array) {
	const Tab = {tails: 0, heads: 0}
	for(let i = 0; i < array.length; i++) {
	  if(array[i] == "heads"){
		Tab.heads = Tab.heads + 1
	  } else {
		Tab.tails = Tab.tails + 1
	  }
	}
	if(Tab.heads == 0){
	  delete Tab.heads
	} if(Tab.tails ==0){
	  delete Tab.tails
	}
	return(Tab)
}

coinRoutes.route('/app/flip').get((req, res) => {
	var flip = coinFlip()
	res.status(200).json({ 'flip' : flip})
})

coinRoutes.route('/app/flips/:number').get((req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
})

function flipACoin(call) {
	const Tab = {call: "", flip: "", result: ""}
	Tab.call = call
	Tab.flip = Math.random() > 0.5 ? ("heads") : ("tails")
	if(Tab.call == Tab.flip){
	  Tab.result = "win"
	} else {
	  Tab.result = "lose"
	}
	return Tab
}

coinRoutes.route('/app/flip/coin').get((req, res) => {
	//?
})

coinRoutes.route('/app/flip/call/:guess').get((req, res) => {
	res.status(200).json(flipACoin(req.params.guess))
})

coinRoutes.route('/app/flip/call/:guess').post((req, res) => {
	const game = flipACoin(req.params.guess)
    res.status(200).json(game)
})

coinRoutes.route('/app/flip/call').post((req, res) => {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
})

coinRoutes.route('/app/flip/coins').post((req, res) => {
	const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
})

module.exports = coinRoutes;



