function checkEnteredValue(e){
	var choice = document.getElementById('inputPointsEarned').value; // get chosen value

    if (e.keyCode == enterKey){ // enter key
		switch(choice){
			case 'n':
				location.replace("../../proj2.php");
				break;
			case 'no':
				location.replace("../../proj2.php");
				break;
			case 'y':
				location.replace("howPointsEarned/howPointsEarned.html");
				break;
			case 'yes':
				location.replace("howPointsEarned/howPointsEarned.html");
				break;
			default:
				;
		}
    }
}

var enterKey = 13;