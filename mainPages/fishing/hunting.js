var myGamePiece;
var myObstacles = [];
var trees;
//var myAnimal;
var myAnimals = [];
var animals = 4;

function startGame() {
	myGameArea.start();
	myGamePiece = new hunter(73,78,"black",10,10);//73,78
	//myAnimal = new animal(70,50,"black",-100,480,1,-1);
	trees = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	for (i = 0; i < trees; i += 1) {
		var x = Math.floor(Math.random() * (myGameArea.canvas.width - 250))+125;
		var y = Math.floor(Math.random() * (myGameArea.canvas.height - 125));
		myObstacles.push(new component(125,125,"black",x,y));
	}
	for (i = 0; i < animals; i += 1) {
		//               Math.floor(Math.random() * (max - min + 1)) + min;
		var cond = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		//console.log(cond);
		switch(cond) {
			case 1://leftside
				var x = Math.floor(Math.random() * (0 - -200 + 1)) + -200;
				var y = Math.floor(Math.random() * (800 - -200 + 1)) + -200;
				var speedX = 1;
				var speedY = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
				myAnimals.push(new animal(70,50,"black",x,y,speedX,speedY));console.log("1");
				break;

			case 2://top
				var x = Math.floor(Math.random() * (1200 - -200 + 1)) + -200;
				var y = Math.floor(Math.random() * (0 - -200 + 1)) + -0;
				var speedY = 1;
				var speedX = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
				myAnimals.push(new animal(70,50,"black",x,y,speedX,speedY));//console.log("2");
				break;

			case 3://rightside
				var x = Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000;
				var y = Math.floor(Math.random() * (800 - -200 + 1)) + -200;
				var speedX = -1;
				var speedY = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
				myAnimals.push(new animal(70,50,"black",x,y,speedX,speedY));//console.log("3");
				break;

			case 4://bottom
				var x = Math.floor(Math.random() * (1200 - -200 + 1)) + -200;
				var y = Math.floor(Math.random() * (800 - 600 + 1)) + 600;
				var speedY = 1;
				var speedX = Math.floor(Math.random() * (1 - -1 + 1)) + -1;
				myAnimals.push(new animal(70,50,"black",x,y,speedX,speedY));//console.log("4");
				break;
		}	
	}
	
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 1000;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea,20);
		window.addEventListener('keydown', function (e) {
			myGameArea.key = e.keyCode;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.key = false;
		})
	},
	clear : function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}

function component(width,height,color,x,y) {
	this.gamearea = myGameArea;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.availableMoves = 4;

	this.myImage = new Image(this.width,this.height);
	this.myImage.src = 'images/tree.png';

	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.drawImage(this.myImage,x,y);
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
			}
		return crash;
	}
	this.stop = function() {
		this.speedX = 0;
		this.speedY = 0;
	}
}

function hunter(width,height,color,x,y) {
	
	this.gamearea = myGameArea;
	
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.availableMoves = 4;
	this.inbounds = true;

	this.myBullets = [];
	this.bulletsAvailable = 20;
	this.bulletCount = 0;

	this.myImage = new Image(this.x,this.y);
	this.myImage.src = 'images/hunterRight.png';

	for (i = 0; i < this.bulletsAvailable; i += 1) {
		this.myBullets.push(new bullet(3,3,"white", this.x+40, this.y+28));
	}

	this.sheet = new SpriteSheet('images/wagonRight.png',238,87);
	this.sheet2 = new SpriteSheet('images/wagonLeft.png',238,87);
	this.walkAnimRight = new Animation(this.sheet,3,0,2);
	this.walkAnimLeft = new Animation(this.sheet2,3,0,2);
	this.anim = this.walkAnimRight;

	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.drawImage(this.myImage,this.x,this.y);
		if (this.x < 0) {
			this.x += 1; this.speedX = 0; this.speedY = 0;
		}
		else if ((this.x + this.width) > 1000) {
			this.x -= 1; this.speedX = 0; this.speedY = 0;		
		}
		else if(this.y < 0) {
			this.y += 1; this.speedX = 0; this.speedY = 0;
		}
		else if ((this.y + this.height) > 600) {
			this.y -= 1; this.speedX = 0; this.speedY = 0;
		}
		else {
			this.inbounds = true;
		}

		if(this.speedX == -1) {
			this.anim = this.walkAnimLeft;
		}
		else if (this.speedX == 1) {
			this.anim = this.walkAnimRight;
		}
		if(this.speedY == -1) {
			this.anim = this.walkAnimRight;
		}
		else if (this.speedY == 1) {
			this.anim = this.walkAnimLeft;
		}
		this.anim.update();
	}
	this.draw = function() {
		this.anim.draw(this.x,this.y);
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
			}
		return crash;
	}
	this.stop = function() {
		this.speedX = 0;
		this.speedY = 0;
	}
}

function SpriteSheet(path,frameWidth,frameHeight){
	this.image = new Image();
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight; 
	var self = this;
	this.image.width = 714;
	self.framesPerRow = Math.floor(this.image.width/self.frameWidth);
	this.image.src = path;
}

function Animation(spritesheet,frameSpeed,startFrame,endFrame) {
	
	var animationSequence = [];
	var currentFrame = 0;
	var counter = 0;
	for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
		animationSequence.push(frameNumber);//0,1,2
	}
	this.update = function() {
		if(counter == (frameSpeed -1)) {
			currentFrame = (currentFrame + 1) % animationSequence.length;
		}
		counter = (counter + 1) % frameSpeed;
	}
	this.draw = function(x,y) {
		
		var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
		var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
		ctx.drawImage(spritesheet.image,col*spritesheet.frameWidth,row*spritesheet.frameHeight, spritesheet.frameWidth,spritesheet.frameHeight,x,y,spritesheet.frameWidth,spritesheet.frameHeight);
	}

}

function bullet(width,height,color,x,y) {
	this.gamearea = myGameArea;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.hit = false;
	this.fired = false;
	this.directionX = 1;
	this.directionY = 0;

	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
			}
		return crash;
	}
	this.stop = function() {
		this.speedX = 0;
		this.speedY = 0;
	}
}

function animal(width,height,color,x,y,speedX,speedY) {
	this.gamearea = myGameArea;
	this.width = width;
	this.height = height;
	this.speedX = speedX;
	this.speedY = speedY;
	this.x = x;
	this.y = y;
	this.dead = false;

	this.sheet = new SpriteSheet('images/oxRight.png',238,87);
	this.sheet2 = new SpriteSheet('images/oxLeft.png',238,87);
	this.sheet3 = new SpriteSheet('images/oxRight.png',238,87);
	this.walkAnimRight = new Animation(this.sheet,3,0,2);
	this.walkAnimLeft = new Animation(this.sheet2,3,0,2);
	this.walkAnimDead = new Animation(this.sheet3,0,0,2);
	this.anim = this.walkAnimRight;

	this.update = function(){
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		if(this.speedX == -1) {
			this.anim = this.walkAnimLeft;
		}
		else if (this.speedX == 1) {
			this.anim = this.walkAnimRight;
		}
		if(this.speedY == -1) {
			this.anim = this.walkAnimRight;
		}
		else if (this.speedY == 1) {
			this.anim = this.walkAnimLeft;
		}
		if(this.dead) {
			this.anim = this.walkAnimDead;
		}
		this.anim.update();
	}
	this.draw = function() {
		this.anim.draw(this.x,this.y);
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
			}
		return crash;
	}
	this.stop = function() {
		this.speedX = 0;
		this.speedY = 0;
	}
}

function updateGameArea() {

	myGameArea.clear();

	for (i = 0; i < myObstacles.length; i += 1) {
		for (j = 0; j < myGamePiece.myBullets.length; j += 1) {
			if (myGamePiece.myBullets[j].crashWith(myObstacles[i])) {
				myGamePiece.myBullets[j].hit = true;
			}
		}
		
		for (j = 0; j < animals; j += 1) {
			if (myAnimals[j].crashWith(myObstacles[i])) {
				myAnimals[j].speedX = -1*myAnimals[j].speedX;
				myAnimals[j].speedY = -1*myAnimals[j].speedY;
			}
		}
	
		//if (myAnimal.crashWith(myObstacles[i])) {
		//	myAnimal.speedX = -1*myAnimal.speedX;
		//	myAnimal.speedY = -1*myAnimal.speedY;
		//}
		if (myGamePiece.crashWith(myObstacles[i])) {
			if (myGamePiece.speedX == 1) {
				myGamePiece.stop(); myGamePiece.availableMoves = 0; myGamePiece.x -=1;
			}	
			if (myGamePiece.speedY == 1) {
				myGamePiece.stop(); myGamePiece.availableMoves = 1; myGamePiece.y -=1;
			}
			if (myGamePiece.speedX == -1) {
				myGamePiece.stop(); myGamePiece.availableMoves = 2; myGamePiece.x +=1;
			}
			if (myGamePiece.speedY == -1) {
				myGamePiece.stop(); myGamePiece.availableMoves = 3; myGamePiece.y +=1;
			}
		}
		myObstacles[i].update();
	}
	
	if (myGamePiece.availableMoves == 4) {
		if (myGameArea.key && myGameArea.key == 37 && myGamePiece.inbounds) {myGamePiece.speedX = -1; myGamePiece.speedY = 0; myGamePiece.myImage.src = 'images/hunterLeft.png';}
		if (myGameArea.key && myGameArea.key == 39 && myGamePiece.inbounds) {myGamePiece.speedX = 1; myGamePiece.speedY = 0; myGamePiece.myImage.src = 'images/hunterRight.png';}
		if (myGameArea.key && myGameArea.key == 38 && myGamePiece.inbounds) {myGamePiece.speedY = -1; myGamePiece.speedX = 0; myGamePiece.myImage.src = 'images/hunterUp.png';}
		if (myGameArea.key && myGameArea.key == 40  && myGamePiece.inbounds) {myGamePiece.speedY = 1; myGamePiece.speedX = 0; myGamePiece.myImage.src = 'images/hunterDown.png';}
		if (myGameArea.key && myGameArea.key == 32 && myGamePiece.inbounds) {myGamePiece.speedY = 0; myGamePiece.speedX = 0; myGamePiece.myImage.src = 'images/hunterDown.png';}
		if (myGameArea.key && myGameArea.key == 66) {
			if (myGamePiece.bulletCount < myGamePiece.bulletsAvailable) {
				myGamePiece.myBullets[myGamePiece.bulletCount].fired = true;
				myGamePiece.myBullets[myGamePiece.bulletCount].directionX = myGamePiece.speedX;
				myGamePiece.myBullets[myGamePiece.bulletCount].directionY = myGamePiece.speedY;
				myGamePiece.bulletCount +=1;
			}
			myGameArea.key = false;
		}
	}
	else if (myGamePiece.availableMoves == 0) {
		if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1;  myGamePiece.availableMoves = 4;}
	}
	else if (myGamePiece.availableMoves == 1) {
		if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1;  myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; myGamePiece.availableMoves = 4;}
	}
	else if (myGamePiece.availableMoves == 2) {
		if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1;  myGamePiece.availableMoves = 4;}
	}
	else if (myGamePiece.availableMoves == 3) {
		if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1;  myGamePiece.availableMoves = 4;}
		if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; myGamePiece.availableMoves = 4;}
	}

	for (i = 0; i < animals; i += 1) {
		if (!myAnimals[i].dead) {
			myAnimals[i].newPos();
		}
		myAnimals[i].update();
		myAnimals[i].draw();
	}

	//if (!myAnimal.dead) {
	//	myAnimal.newPos();
	//}
	//myAnimal.update();
	//myAnimal.draw();

	myGamePiece.newPos();
	myGamePiece.update();
	myGamePiece.draw();

	for (i = 0; i < myGamePiece.myBullets.length; i += 1) {
		if (myGamePiece.speedX == 1 && !myGamePiece.myBullets[i].fired) {myGamePiece.myBullets[i].speedX = 1; myGamePiece.myBullets[i].speedY = 0;}
		if (myGamePiece.speedX == -1 && !myGamePiece.myBullets[i].fired) {myGamePiece.myBullets[i].speedX = -1; myGamePiece.myBullets[i].speedY = 0;}
		if (myGamePiece.speedY == 1 && !myGamePiece.myBullets[i].fired) {myGamePiece.myBullets[i].speedX = 0; myGamePiece.myBullets[i].speedY = 1;}
		if (myGamePiece.speedY == -1 && !myGamePiece.myBullets[i].fired) {myGamePiece.myBullets[i].speedX = 0; myGamePiece.myBullets[i].speedY = -1;}
		if ((myGamePiece.speedY == 0 && myGamePiece.speedX ==0) && !myGamePiece.myBullets[i].fired) {myGamePiece.myBullets[i].speedX = 0; myGamePiece.myBullets[i].speedY = 0;}
		
		if (myGamePiece.myBullets[i].fired) {
				if (myGamePiece.myBullets[i].directionX == 1) {
					myGamePiece.myBullets[i].speedX = 4;
				}
				if (myGamePiece.myBullets[i].directionY == 1) {
					myGamePiece.myBullets[i].speedY = 4;
				}
				if (myGamePiece.myBullets[i].directionX == -1) {
					myGamePiece.myBullets[i].speedX = -4;
				}
				if (myGamePiece.myBullets[i].directionY == -1) {
					myGamePiece.myBullets[i].speedY = -4;
				}	
						
		}

		for (j = 0; j < animals; j += 1) {
			if (myAnimals[j].crashWith(myGamePiece.myBullets[i])) {
				myAnimals[j].dead = true; myGamePiece.myBullets[i].hit = true;
			}
		}

		//if (myAnimal.crashWith(myGamePiece.myBullets[i])) {
		//	myAnimal.dead = true; myGamePiece.myBullets[i].hit = true;
		//}
		if (!myGamePiece.myBullets[i].hit) {
			myGamePiece.myBullets[i].newPos();
			myGamePiece.myBullets[i].update();
		}
	}
	


	
}
