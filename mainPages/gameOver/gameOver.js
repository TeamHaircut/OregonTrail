$(document).ready(function(){
	// RESET GAME
	var game = [];
	window.sessionStorage.game = JSON.stringify(game);
	$(document).keydown(function(e){
 		if(e.keyCode == spacebarKey){
			location.replace("../../proj2.php"); 
		} // end keycode
	}); // end keydown

	var spacebarKey = 32, enterKey = 13;
});