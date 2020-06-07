var game = JSON.parse(window.sessionStorage.game);
var spacebarKey = 32, enterKey = 13;

//function animateCross()
//Coding Designs from W3Schools:
//https://www.w3schools.com/howto/howto_js_animate.asp
function animateCross() {
  	var wheel = document.getElementById("wheelCanvas");

  	var start = 300;
    var time = setInterval(frame, 15);

 	function frame() {
    		if (start == -300) {
      			clearInterval(time);
    		}
    		else {
     			start--;
      			wheel.style.left = start + 'px';

    		}
  	}
}

function checkEvent() {

	if (game.location == "South Pass" && game.branch == 1){
		game.branch = 0;
		window.sessionStorage.game = JSON.stringify(game);
		location.replace("branch/branch.html");
	}
	if (game.location == 'the Blue Mountains' && game.branch == 1){
		game.branch = 0;
		window.sessionStorage.game = JSON.stringify(game);
		location.replace("branch/branch.html");
	}
	if(game.location == 'the Kansas River crossing' || game.location == 'the Big Blue River crossing' || game.location == 'the Green River crossing' || game.location == 'the Snake River crossing'){
		if (game.crossing == 1) {
			game.crossing = 0;
			window.sessionStorage.game = JSON.stringify(game);
			location.replace("crossing/crossing.html");
		}
	}
}

function go() {
  var name = game.location;
  calcDays(1, game);
  calcMiles(game);
  game.weather = updateWeather(game.month);
  game.water = waterStatus();
  var gameOver = calculateHealth(game);
  var tombstoneStop = false;


  var tombstones = JSON.parse(window.sessionStorage.tombstones);
  for(var i = 0; i < tombstones.length; i++){
    if (game.toGo <= tombstones[i]['mile'] && game.location == tombstones[i]['start']){
        tombstoneStop = true;
        break;
    }
  }

    if(gameOver) {
        location.replace("../gameOver/gameOver.html");
    }
    else if(tombstoneStop){
        window.sessionStorage.game = JSON.stringify(game);
        location.replace('../tombstone/tombstone.html');
    }
    else {
      if (game.toGo <= 0) {

        // arriving at a landmark, the location is set based on previously visited
    	if (name == 'Independence') {
    		game.location = 'the Kansas River crossing';
    		game.crossing = 1;
    		game.riverWidth = Math.floor(Math.random() * (700 - 600) ) + 600;
    		game.riverDepth = (Math.random() * (3 - 2) + 2).toFixed(1);
    		game.next = 'the Big Blue River crossing';
    		game.toGo = 82;
    	}
    	if (name == 'the Kansas River crossing') {
    		game.location = 'the Big Blue River crossing';
    		game.crossing = 1;
    		game.riverWidth = Math.floor(Math.random() * (300 - 200) ) + 200;
    		game.riverDepth = (Math.random() * (2 - 1)  + 1).toFixed(1);
    		game.next = 'Fort Kearney';
    		game.toGo = 118;
    	}
    	if (name == 'the Big Blue River crossing') {
    		game.location = "Fort Kearney";
    		game.next = 'Chimney Rock';
    		game.toGo = 250;
    	}
    	if (name == 'Fort Kearney') {
    		game.location = "Chimney Rock";
    		game.next = 'Fort Laramie';
    		game.toGo = 86;
    	}
    	if (name == 'Chimney Rock') {
    		game.location = "Fort Laramie";
    		game.next = 'Independence Rock';
    		game.toGo = 190;
    	}
    	if (name == 'Fort Laramie') {
    		game.location = "Independence Rock";
    		game.next = 'South Pass';
    		game.toGo = 102;
    	}
    	if (name == 'Independence Rock') {
    		game.location = "South Pass";
    		game.next = 'the Green River crossing';
    		game.next2 = 'Fort Bridger';
    		game.branch = 1;
    		game.toGo = 57;
    		game.toGo2 = 125;
    	}
    	if (name == 'South Pass') {

    		if (game.next == 'the Green River crossing') {
    			game.location = 'the Green River crossing';
    			game.crossing = 1;
    			game.riverWidth = Math.floor(Math.random() * (500 - 400) ) + 400;
    			game.riverDepth = (Math.random() * (25 - 20) + 20).toFixed(1);
    			game.next = 'Soda Springs';
    			game.toGo = 143;

    		}
    		else {
    			game.location = "Fort Bridger";
    			game.next = 'Soda Springs';
    			game.toGo = 162;
    		}
    	}
    	if (name == 'the Green River crossing' || name == 'Fort Bridger') {
    		game.location = "Soda Springs";
    		game.next = 'Fort Hall';
    		game.toGo = 57;
    	}
    	if (name == 'Soda Springs') {
    		game.location = "Fort Hall";
    		game.next = 'the Snake River crossing';
    		game.toGo = 182;
    	}
    	if (name == 'Fort Hall') {
    		game.location = 'the Snake River crossing';
    		game.crossing = 1;
    		game.riverWidth = Math.floor(Math.random() * (1100 - 1000) ) + 1000;
    		game.riverDepth = (Math.random() * (7 - 5) + 5).toFixed(1);
    		game.next = 'Fort Boise';
    		game.toGo = 113;
    	}
    	if (name == 'the Snake River crossing') {
    		game.location = "Fort Boise";
    		game.next = 'the Blue Mountains';
    		game.toGo = 160;
    	}
    	if (name == 'Fort Boise') {
    		game.location = "the Blue Mountains";
    		game.next = 'Fort Walla Walla';
    		game.next2 = 'The Dalles';
    		game.branch = 1;
    		game.toGo = 55;
    		game.toGo2 = 125;
    	}
    	if (name == 'the Blue Mountains') {

    		if (game.next == 'Fort Walla Walla') {
    			game.location = "Fort Walla Walla";
    			game.next = 'The Dalles';
    			game.toGo = 120;
    		}
    		else {
    			game.location = "The Dalles";
    		}
    	}
    	if (name == 'Fort Walla Walla') {
    		game.location = "The Dalles";
    		game.next = 'the Willamette Valley';
    		game.riverGame = 0;
    	}

    	window.sessionStorage.game = JSON.stringify(game);
    	location.replace("landmark.html");
      }
      else {
        getRandomEvents(game);
    	window.sessionStorage.game = JSON.stringify(game);
    	location.replace("go.php");
      }
    }
}
$(document).ready(function() {
	$('#nameLocation').html(game.location);
	$('#nextLocation').html(game.next);
	$('#nextLocation2').html(game.next2);

	$('#dateLocation').html(getDate(game));
	$('#milesLeft').html(game.toGo);
	$('#milesLeft2').html(game.toGo);

	$('#milesGone').html(game.miles);
	$('#milesBranch').html(game.toGo2);

	$("#food").text(game.food);
	$("#health").text(healthStatus(game.health));
	$("#weather").text(game.weather);

	$("#rivWidth").text(game.riverWidth);
	$("#rivDepth").text(game.riverDepth);

	$("#barButton2").click(function() {
    		game.inTown = false;
    		window.sessionStorage.game = JSON.stringify(game);
    		location.replace("go.php");
	});

	$("#returnButton2").click(function() {
    		game.inTown = false;
    		window.sessionStorage.game = JSON.stringify(game);
                location.replace("../main.html");
	});

    	$(document).keydown(function(e) {
    		if(e.keyCode == spacebarKey){
    			game.inTown = false;
    			window.sessionStorage.game = JSON.stringify(game);
    			location.replace("go.php");
    		}
        	if(e.keyCode == enterKey){
    			game.inTown = false;
    			window.sessionStorage.game = JSON.stringify(game);
                location.replace("../main.html");
    		}
	});
});
