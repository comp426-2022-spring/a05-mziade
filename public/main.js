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
					//singlenav.disabled = true
				})
                // let flip = "FLIPPED"
				// document.getElementById("singlenav").innerHTML = flip;
				// console.log("Coin has been flipped. Result: "+ flip)
            }
// Flip multiple coins and show coin images in table as well as summary results
const coins = document.getElementById("coins")
coins.addEventListener("submit", flipCoins)
			// Create the submit handler
			async function flipCoins(event) {
				event.preventDefault();
				
				//const endpoint = "app/flip/coins"
				const url = 'http://localhost:5000/app/flip/coins'
				console.log(url)
				const formEvent = event.currentTarget

				try {
					const formData = new FormData(formEvent);
					const flips = await sendFlips({ url, formData });
					console.log(flips);
					document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
					document.getElementById("headscount").setAttribute("src", "assets/img/heads.png");
					document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
					document.getElementById("tailscount").setAttribute("src", "assets/img/tails.png");

				} catch (error) {
					console.log(error);
				}
			}
			// Create a data sender
			async function sendFlips({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: formDataJson
				};

				const response = await fetch(url, options);
				console.log(response)
				return response.json()
			}
//Enter number and press button to activate coin flip series

//Guess a flip by clicking either heads or tails button
guessheads = document.getElementById("guessheads")
guessheads.addEventListener("click", guessFlipheads)
			function guessFlipheads() {
                fetch('http://localhost:5000/app/flip/call/heads', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("resultguess").innerHTML = "heads";
					document.getElementById("guesspic").setAttribute("src", "assets/img/heads.png");
					document.getElementById("resultflip").innerHTML = result.flip;
					document.getElementById("resultpic").setAttribute("src", "assets/img/"+result.flip+".png");
					document.getElementById("resultresult").innerHTML = result.result;
				})
            }

guesstails = document.getElementById("guesstails")
guesstails.addEventListener("click", guessFliptails)
			function guessFliptails() {
                fetch('http://localhost:5000/app/flip/call/tails', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("resultguess").innerHTML = "tails";
					document.getElementById("guesspic").setAttribute("src", "assets/img/tails.png");
					document.getElementById("resultflip").innerHTML = result.flip;
					document.getElementById("resultpic").setAttribute("src", "assets/img/"+result.flip+".png");
					document.getElementById("resultresult").innerHTML = result.result;
				})
            }
