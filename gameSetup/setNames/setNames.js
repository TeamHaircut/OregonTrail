$(document).ready(function(){
	var game = JSON.parse(window.sessionStorage.game);
	game.party = [];

	$(document).keydown(function(e){

		if(e.keyCode == enterKey && counter <= 4){ // initial name input
			names[counter] = $('#input').val();

			if(name[counter] != ""){
				counter++; // increment only when name found
				if(counter == 1){
					$('#text').html('<br>Who is the next member of your party?');
				}
				else if(counter > 4){
					$('#text').html('<br>Are these names correct?');
				}
				$('#input').val("");
			} // end name != "" if

		} // end outer if

		else if(e.keyCode == enterKey && isChoosingNumber){
			var choice = parseInt($('#input').val());
			if(choice != NaN && choice >= 1 && choice <= 5){ // only 5 names to choose from
				$('#text').html('What would you like to change the name to?<br>');
				position = choice - 1; // position to change in names[]
				$('#input').val("");
				isChoosingNumber = false;
				isChangingName = true;
			}
		}

		else if(e.keyCode == enterKey && isChangingName){
			var choice = $('#input').val();
			if(choice != ""){
				names[position] = choice;
				$('#text').html('<br>Are these names correct?');
				$('#input').val("");
				isChangingName = false;
			}
		}

		else if(e.keyCode == enterKey){ // only when counter > 4
			var userResponse = $('#input').val(); // Are the names correct
			if(userResponse == "y" || userResponse == "yes"){
				// save party variables in JS session storage game variable
				for (var i = 0; i < 5; i++){
					game.party.push(names[i]); // push all of the names
				}
				game.health = [10, 10, 10, 10, 10];
				game.ailment = [0, 0, 0, 0, 0];
				// UNCOMMENT FOR LIST OF PARTY MEMBERS /* alert(game.party); */
				window.sessionStorage.game = JSON.stringify(game);
				location.replace("../pickMonth/pickMonth.html");
			}

			else if(userResponse == "n" || userResponse == "no"){
				$('#text').html('<br>Which party member do you want to change the name of? (number)');
				$('#input').val("");
				isChoosingNumber = true;
			}
		} // end else if, if not a yes/no response, keep the user in this section
	}); // end keydown
	var enterKey = 13;
	var names = [];
	var position = -1; // used to change items in names[]
	var counter = 0; // the number of the current position in the names array
	var isChoosingNumber = false, isChangingName = false;
});