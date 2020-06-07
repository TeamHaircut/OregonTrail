$(document).ready(function(){

	// Returns a random number from 0 to 100
	function getAmount(){
		return Math.floor(Math.random() * 100);
	}

	var game = JSON.parse(window.sessionStorage.game);

	// make sure player can actually fish
	if (game.poles == 0) {
		$("#text").css("display", "none");
		$(document).keydown(function(e) {
			if (e.keyCode == spacebarKey) {
				location.replace("../main.html");
			}
		});
		$("#barButton2").click(function() {
			location.replace("../main.html");
		});
	} else {
		$("#noPoles").css("display", "none");

		$(document).keydown(function(e){

	 		if(e.keyCode == spacebarKey){
	 			if (counter == 0){
 					var amount = getAmount();
 					if(amount > 0){
						$('#text').text("You caught " + amount + " pounds of fish!");
 					}
 					else{
 						$('#text').text("No fish are biting right now!");
 					}
 					game.food += amount;
					if (game.poles > 0) {
						game.poles -= 1;
					}

					calcDays(1, game);
					var savePace = game.pace;
					game.pace = "fish";
				    calculateHealth(game);
					game.pace = savePace;
				    game.weather = updateWeather(game.month);
				    game.water = waterStatus();

 					window.sessionStorage.game = JSON.stringify(game);
 					counter++;
 				}
				else {
 					location.replace("../main.html");
 					// TODO: go back to previous page
	 			} // end switch
			} // end keycode

		}); // end keydown

	}
	var spacebarKey = 32, enterKey = 13;
	var counter = 0;
});
