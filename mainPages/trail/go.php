<?php
	sleep(5);
?>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="../../proj2.css">
</head>

<body onload="go(); animateCross();">
	<div class="rest normalFont" id="info">
		<span id="random" style="display: none"></span>
	</div>
	<div class="title" id="space">Press RETURN to size up the situation</div>
	<div class="trailCanvas">

  		<div id="wheelCanvas">
  			<div id="wagon"></div>
    			<div class="front">
      				<div class="moveWheel"></div>
    			</div>
    			<div class="back">
      				<div class="moveWheel"></div>
    			</div>
  		</div>
	</div>
	<div class="normalFont status">
		Date: <span id="dateLocation"></span> <br>
		Weather: <span id="weather"></span> <br>
		Health: <span id="health"></span> <br>
		Food: <span id="food"></span> <br>
		Next landmark: <span id="milesLeft"></span> <br>
		Miles traveled: <span id="milesGone"></span> <br>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="../../landmarkInfo.js" type="text/javascript"></script>
	<script src="../common.js" type="text/javascript"></script>
	<script src="go.js" type="text/javascript"></script>

</body>
</html>
