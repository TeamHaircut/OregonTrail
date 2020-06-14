var game = JSON.parse(window.sessionStorage.game);

//function animateCross()
//Coding Designs from W3Schools:
//https://www.w3schools.com/howto/howto_js_animate.asp
function animateCross() {
  	var ford = document.getElementById("ford");
  	var start = 100;
 	var time = setInterval(frame, 15);

 	function frame() {
    		if (start == -250) {
      			clearInterval(time);
                getRiverEvent();
                window.sessionStorage.game = JSON.stringify(game);
			    location.replace("../trail.html");
    		}
    		else {
     			start--;
      			ford.style.top = start + 'px';
      			ford.style.left = start + 'px';
    		}
  	}
}

function getRiverPen(){
		var intro = "Your wagon was flooded. You lost ";
		var amount;
		var outcome;
		var rand2 = Math.floor((Math.random()*4) + 1);
		switch (rand2) {
				case 1:
					amount = Math.floor((Math.random()*100) + 1);
					outcome = " pounds of food.";
					game.food-=amount;
					if (game.food < 0){
						game.food = 0;
					}
					window.sessionStorage.game = JSON.stringify(game);
					break;
				case 2:
					amount = Math.floor((Math.random()*5) + 1);
					outcome = " sets of clothing.";
					game.sets-=amount;
					if (game.sets < 0){
						game.sets = 0;
					}
					window.sessionStorage.game = JSON.stringify(game);
					break;
				case 3:
					amount = Math.floor((Math.random()*2) + 1);
					outcome = " poles.";
					game.poles-=amount;
					if (game.poles < 0){
						game.poles = 0;
					}
					window.sessionStorage.game = JSON.stringify(game);
					break;
				case 4:
					amount = Math.floor((Math.random()*2) + 1);
					outcome = " oxen.";
					game.oxen-=amount;
					if (game.oxen < 0){
						game.oxen = 0;
					}
					window.sessionStorage.game = JSON.stringify(game);
					break;
				default:

		}
  		//document.getElementById("river").style.display="block";
		//document.getElementById("river").innerHTML = intro +amount +outcome;
        alert(intro +amount +outcome);
}

function getRiverEvent(){
	var rand = Math.random();
	var choice = game.riverChoice;
	if (game.riverChoice == 1) {

	   	if(rand > 0.90 && game.riverDepth <= 2.5) {
			getRiverPen();
		}
	   	else if(rand > 0.50) {
			getRiverPen();
		}
		else{
  			//document.getElementById("river").style.display="block";
			//document.getElementById("river").innerHTML = "You had no problem crossing the river";
            alert("You had no problem crossing the river");
		}
	}
	else if (game.riverChoice == 2 && game.riverDepth <= 2.5) {

	   	if(rand > 0.90 && game.riverDepth <= 2.5) {
			getRiverPen();
		}
	   	else if(rand > 0.75) {
			getRiverPen();
		}
		else{
  	// 		document.getElementById("river").style.display="block";
			// document.getElementById("river").innerHTML = "You had no problem crossing the river";
            alert("You had no problem crossing the river");
		}
	}
	else if (game.riverChoice == 3 && game.riverDepth <= 2.5) {

	   	if(rand > 0.90) {
			getRiverPen();
		}
		else{
  	// 		document.getElementById("river").style.display="block";
			// document.getElementById("river").innerHTML = "You had no problem crossing the river";
            alert("You had no problem crossing the river");
		}
	}
	else{}
}

document.body.onkeyup = function(e){
    	if(e.keyCode == 32){
		location.replace("crossing.html");
    	}
}

function barButton() {
	location.replace("crossing.html");
}
