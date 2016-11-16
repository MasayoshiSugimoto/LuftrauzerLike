"use strict";

const FRAME_TIME					= 1000 / 30; //milliseconds
const GRAVITY_CONSTANT		= 9.80665;
const PIXEL_PER_METER			= 200;
const GRAVITY_VECTOR 			= Vector2D.create(0,GRAVITY_CONSTANT);

var ship = Ship.create();
var lastTime = (new Date()).getTime();

function meter2Pixel(distanceInMeter) {
	return distanceInMeter * PIXEL_PER_METER;
}

function pixel2Meter(distanceInPixel) {
	return distanceInPixel / PIXEL_PER_METER;
}

function vectorMeter2Pixel(v) {
	return v.scalarMultiply(PIXEL_PER_METER);
}

function vectorPixel2Meter(v) {
	return v.scalarMultiply(1 / PIXEL_PER_METER);
}

function gameLoop() {

	let debugDiv = document.getElementById("debug");
	debugDiv.textContent = ship.velocity.toString();

	//Calculate the elapsed time
	let newTime = (new Date()).getTime();
	let elapsedTime = (newTime - lastTime) / 1000; //Elapsed time in second
	lastTime = newTime;

	ship.updateControl(elapsedTime);
	ship.updatePosition(elapsedTime);

	//Keep in the screen
	let canvas = document.getElementById("canvas");
	if (ship.position.x >= pixel2Meter(canvas.width)) {
		ship.position.x = pixel2Meter(canvas.width - 1);
		ship.velocity.x = 0;
		ship.velocity.y = 0;
	}
	if (ship.position.x < 0) {
		ship.position.x = 0;	
		ship.velocity.x = 0;
		ship.velocity.y = 0;
	}
	if (ship.position.y >= pixel2Meter(canvas.height)) {
		ship.position.y = pixel2Meter(canvas.height -1);
		ship.velocity.y = 0;
		ship.velocity.x = 0;
	}
	if (ship.position.y < 0) {
		ship.position.y = 0;
		ship.velocity.y = 0;
		ship.velocity.x = 0;
	}

	let canvasContext = canvas.getContext("2d"); //Get the draw context
	canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

	{
		/* Draw the ship. Look like the following:
		*      X
		*  X   X
		*  XXXXXXX
		*  X   X
		*      X
		*/
		//Set the color of the ship
		canvasContext.fillStyle = "black";

		let screenCoordinates = vectorMeter2Pixel(ship.position);
		canvasContext.save();
		canvasContext.translate(screenCoordinates.x, screenCoordinates.y);
		canvasContext.rotate(ship.direction);
		canvasContext.fillRect(-60/2,-5,60,10);
		{
			canvasContext.save();
			canvasContext.translate(10,0);
			canvasContext.fillRect(-5,-70/2,10,70);
			canvasContext.restore();
		}
		{
			canvasContext.save();
			canvasContext.translate(-25,0);
			canvasContext.fillRect(-5,-30/2,10,30);
			canvasContext.restore();
		}
		canvasContext.restore();
	}

}

const LuftrauzerLike = {

	//First function to be called.
	startGame() {

		//Set key down handler
		window.onkeydown = function(event) {
			switch (event.which) {
				case 87: //E
					ship.isBoost = true;
					break;
				case 65: //A
					ship.isLeft = true;
					break;
				case 68: //D
					ship.isRight = true;
					break;
			}
		}

		//Set key up handler
		window.onkeyup = function(event) {
			switch (event.which) {
				case 87: //E
					ship.isBoost = false;
					break;
				case 65: //A
					ship.isLeft = false;
					break;
				case 68: //D
					ship.isRight = false;
					break;
			}
		}

		window.setInterval(gameLoop,FRAME_TIME);

	}
};


