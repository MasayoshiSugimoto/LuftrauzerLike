"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const FRAME_TIME_SECOND						= FRAME_TIME_MILLISECOND / 1000.0;
const GRAVITY_CONSTANT						= 9.80665;
const PIXEL_PER_METER							= 200;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);
const TIMEOUT_LATENCY_MILLISECOND = 10;

var ship = Ship.create();
var lastTimeMillisecond = (new Date()).getTime();
var frameCounter = 0;
var frameCounterTimerMillisecond = 0;

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

	//First thing to do on a frame update is to update the current time.
	//Calculate the elapsed time
	let frameStartTimeMillisecond = (new Date()).getTime();
	let elapsedTimeSecond = Math.min(
		(frameStartTimeMillisecond - lastTimeMillisecond) / 1000,
		FRAME_TIME_SECOND); 
	lastTimeMillisecond = frameStartTimeMillisecond;

	let debugDiv = document.getElementById("debug");

	//Update frame counter
	frameCounter++;
	frameCounterTimerMillisecond = frameCounterTimerMillisecond + elapsedTimeSecond * 1000.0;
	if (frameCounterTimerMillisecond >= 1000 /* 1 second */) {
		//Update frame counter display
		debugDiv.textContent = "Frame per second = " + frameCounter;
		//Reset frame counter
		frameCounterTimerMillisecond = frameCounterTimerMillisecond - 1000;
		frameCounter = 0
	}

	ship.updateControl(elapsedTimeSecond);
	ship.updatePosition(elapsedTimeSecond);

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

	canvasContext.fillStyle = "#66ccff"; //Blue sky color
	canvasContext.fillRect(0,0,canvas.width, canvas.height); //Blue sky background

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

	window.setTimeout(gameLoop,
		//Remaining time before frame update in millisecond
		FRAME_TIME_MILLISECOND - Math.max(0, (new Date()).getTime() - frameStartTimeMillisecond) 
	);
}

const LuftrauzerLike = {

	//First function to be called.
	//Setup the game before starting the game loop
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

		let canvas = document.getElementById("canvas");

		//The ship starts at the bottom of the screen, horizontaly centered.
		ship.position = Vector2D.create(
			pixel2Meter(canvas.width / 2),
			pixel2Meter(canvas.height - 1));
		//The ship starts by beeing thrown upward.
		ship.direction = -Math.PI / 2.0;
		ship.velocity = Vector2D.create(0.0, -5);

		gameLoop();

	}
};


