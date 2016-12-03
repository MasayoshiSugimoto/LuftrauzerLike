"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const FRAME_TIME_SECOND						= FRAME_TIME_MILLISECOND / 1000.0;
const GRAVITY_CONSTANT						= 9.80665;
const PIXEL_PER_METER							= 200;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);
const TIMEOUT_LATENCY_MILLISECOND = 10;

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

const LuftrauzerLike = {

	create() {
		let gameContext = Object.create(this.template);
		let shapeMap = ShapeLoader.create().load(SHAPES);
		gameContext.ship = Ship.create(shapeMap.get("ship"));
		return gameContext;
	},

	template: {
		//First function to be called.
		//Setup the game before starting the game loop
		startGame() {

			let gameContext = this;
			//Set key down handler
			window.onkeydown = function(event) {
				switch (event.which) {
					case 87: //E
						gameContext.ship.isBoost = true;
						break;
					case 65: //A
						gameContext.ship.isLeft = true;
						break;
					case 68: //D
						gameContext.ship.isRight = true;
						break;
					case 32: //Space
						break;
				}
			}

			//Set key up handler
			window.onkeyup = function(event) {
				switch (event.which) {
					case 87: //E
						gameContext.ship.isBoost = false;
						break;
					case 65: //A
						gameContext.ship.isLeft = false;
						break;
					case 68: //D
						gameContext.ship.isRight = false;
						break;
				}
			}

			let canvas = document.getElementById("canvas");

			//The ship starts at the bottom of the screen, horizontaly centered.
			this.ship.setPosition(Vector2D.create(
				pixel2Meter(canvas.width / 2),
				pixel2Meter(canvas.height - 1)));
			//The ship starts by beeing thrown upward.
			this.ship.setDirection(-Math.PI / 2.0);
			this.ship.velocity = Vector2D.create(0.0, -5);

			this.gameLoop();

		},

		gameLoop() {

			//First thing to do on a frame update is to update the current time.
			//Calculate the elapsed time
			let frameStartTimeMillisecond = (new Date()).getTime();
			let elapsedTimeSecond = Math.min(
				(frameStartTimeMillisecond - lastTimeMillisecond) / 1000,
				FRAME_TIME_SECOND); 
			lastTimeMillisecond = frameStartTimeMillisecond;

			//Update frame counter
			frameCounter++;
			frameCounterTimerMillisecond = frameCounterTimerMillisecond + elapsedTimeSecond * 1000.0;
			if (frameCounterTimerMillisecond >= 1000 /* 1 second */) {
				//Update frame counter display
				let debugDiv = document.getElementById("debug");
				debugDiv.textContent = "Frame per second = " + frameCounter;
				//Reset frame counter
				frameCounterTimerMillisecond = frameCounterTimerMillisecond - 1000;
				frameCounter = 0
			}

			this.ship.updateControl(elapsedTimeSecond);
			this.ship.updatePosition(elapsedTimeSecond);

			//Keep in the screen
			let canvas = document.getElementById("canvas");
			if (this.ship.getPosition().x >= pixel2Meter(canvas.width)) {
				this.ship.getPosition().x = pixel2Meter(canvas.width - 1);
				this.ship.velocity.x = 0;
				this.ship.velocity.y = 0;
			}
			if (this.ship.getPosition().x < 0) {
				this.ship.getPosition().x = 0;	
				this.ship.velocity.x = 0;
				this.ship.velocity.y = 0;
			}
			if (this.ship.getPosition().y >= pixel2Meter(canvas.height)) {
				this.ship.getPosition().y = pixel2Meter(canvas.height -1);
				this.ship.velocity.y = 0;
				this.ship.velocity.x = 0;
			}
			if (this.ship.getPosition().y < 0) {
				this.ship.getPosition().y = 0;
				this.ship.velocity.y = 0;
				this.ship.velocity.x = 0;
			}

			let canvasContext = canvas.getContext("2d"); //Get the draw context
			canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

			canvasContext.fillStyle = "#66ccff"; //Blue sky color
			canvasContext.fillRect(0,0,canvas.width, canvas.height); //Blue sky background

			this.ship.draw(canvasContext);

			let gameContext = this;
			window.setTimeout(
				function() { gameContext.gameLoop(); },
				//Remaining time before frame update in millisecond
				FRAME_TIME_MILLISECOND - Math.max(0, (new Date()).getTime() - frameStartTimeMillisecond) 
			);
		}
	}

};


