$('body').keyup(function(e){
   if(e.keyCode == spacebarKey){
		count++;
		switch(count){
			case 1:
				$('#pointsInfoParagraph').text('The resources you arrive with will help you get started in the new land.  You receive points for each item you bring safely to Oregon.');
				$('#tableHeader1').text('Resources of Party');
				$('#tableHeader2').text('Points per Item');
				$("#pointsTable").find("tr:gt(0)").remove();
				$('#pointsTable tr:last').after('<tr><td>wagon</td><td></td><td>50</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>ox</td><td></td><td>4</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>spare wagon part</td><td></td><td>2</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>set of clothing</td><td></td><td>2</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>poles</td><td></td><td>1</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>food (each 25 pounds)</td><td></td><td>1</td></tr>');
				$('#pointsTable tr:last').after('<tr><td>cash (each 50)</td><td></td><td>1</td></tr>');		
				break;
			case 2:
				$('#pointsInfoParagraph').text('You receive points for your occupation in the new land.  Because more farmers and carpenters were needed than bankers, you receive double points arriving in Oregon as a carpenter, and triple points for arriving as a farmer.');
				$('#pointsTable').remove();
				break;
			default:
				location.replace("../../../proj2.php");
    	}
   }
});

var spacebarKey = 32;
var count = 0;