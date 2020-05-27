$(document).ready(function() {

    var game = JSON.parse(window.sessionStorage.game);

    // place players supplies in appropriate positions
    $("#oxen").text(game.oxen);
    $("#food").text(game.food);
    $("#sets").text(game.sets);
    $("#poles").text(game.poles);
    $("#axles").text(game.axles);
    $("#wheels").text(game.wheels);
    $("#tongues").text(game.tongues);
    $("#money").text("$" + game.money.toFixed(2).toString());


    // space to return to menu
    $(document).keydown(function(e){
        if(e.keyCode == 32){
            location.replace("../main.html");
        }
    });

});
