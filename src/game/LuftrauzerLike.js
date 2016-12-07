"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const FRAME_TIME_SECOND						= FRAME_TIME_MILLISECOND / 1000.0;
const GRAVITY_CONSTANT						= 9.80665;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);
const TIMEOUT_LATENCY_MILLISECOND = 10;

var lastTimeMillisecond = (new Date()).getTime();
var frameCounter = 0;
var frameCounterTimerMillisecond = 0;

const LuftrauzerLike = {

	create() {
		let shapeMap = ShapeLoader.create().load(SHAPES);

		return Object.assign(
			{
				ship: Ship.create(shapeMap.get("ship"))
			}, 
			{
				//First function to be called.
				//Setup the game before starting the game loop
				//This function is only called once at startup
				startGame() {

					Keyboard.setup(this);

					let canvas = document.getElementById("canvas");

					//The ship starts at the bottom of the screen, horizontaly centered.
					this.ship.setPosition(Vector2D.create(
								pixel2Meter(canvas.width / 2),
								pixel2Meter(canvas.height - 1)));
					//The ship starts by beeing thrown upward.
					this.ship.setDirection(-Math.PI / 2.0);
					this.ship.velocity = Vector2D.create(0.0, -5);

					let luftrauzerLike = this;
					Scheduler.create(Time.create())
						.callByInterval(
							(elapsedTimeSecond) => { luftrauzerLike.gameLoop(elapsedTimeSecond); },
							FRAME_TIME_MILLISECOND);

				},

				gameLoop(elapsedTimeSecond) {

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

				}
			});
	}

};


