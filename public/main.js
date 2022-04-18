//Event listener for whatever is being clicked 
document.addEventListener("click", activeNow);
// Replace text in anything with "active" id
	function activeNow() {
		const active_now = document.activeElement
		//document.getElementById("active").innerHTML = active_now;
	    console.log(active_now)
	}
// Focus div based on nav button click
const home = document.getElementById("homenav")
const singlenav = document.getElementById("singlenav")
const multinav = document.getElementById("multinav")
const guessnav = document.getElementById("guessnav")

// Flip one coin and show coin image to match result when button clicked
singlenav.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("result").innerHTML = result.flip;
					document.getElementById("quarter").setAttribute("src", "assets/img/"+result.flip+".png");
					singlenav.disabled = true
				})
                // let flip = "FLIPPED"
				// document.getElementById("singlenav").innerHTML = flip;
				// console.log("Coin has been flipped. Result: "+ flip)
            }
// Flip multiple coins and show coin images in table as well as summary results
// multi.addEventListener("click", flipCoins)
// 			function flipCoins() {
//                 fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
//   				.then(function(response) {
//     			  return response.json();
//   				})
// 				.then(function(result) {
// 					console.log(result);
// 					document.getElementById("resultmult").innerHTML = result.flip;
// 					// document.getElementById("quarter").setAttribute("src", result.flip+".jpg");
// 					multi.disabled = true
// 				})
//                 let flip = "FLIPPED"
// 				document.getElementById("multi").innerHTML = flip;
// 				console.log("Coins have been flipped. Result: "+ flip)
//             }
//Enter number and press button to activate coin flip series

//Guess a flip by clicking either heads or tails button
