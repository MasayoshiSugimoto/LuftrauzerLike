"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const GRAVITY_CONSTANT						= 9.80665;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);

const LuftrauzerLike = {

	create() {

		return Object.assign(
			{
				ship              :  null,
				drawObjectManager :  DrawObjectManager.create(),
				machineGun        :  null,
				enemy             :  null
			}, 
			{
				getMachineGun() {
					return this.machineGun;
				},

				//First function to be called.
				//Setup the game before starting the game loop
				//This function is only called once at startup
				startGame() {
					let that = this;
					ImageLoader.load(ImageFactory, IMAGE_DATA, (images) => { that.onImagesLoaded(images); });
				},

				onImagesLoaded(images) {

					Keyboard.setup(this);

					let canvas = document.getElementById("canvas");

					//Clouds
					CloudGenerator.create(this.drawObjectManager, images, Cloud, ImageDrawObject);

					this.ship = Ship.create(ImageDrawObject.create(images.get('images/Reisen.png')))
						//The ship starts at the bottom of the screen, horizontaly centered.
						.setPosition(Vector2D.create(
								ScreenConversion.pixel2Meter(canvas.width / 2),
								ScreenConversion.pixel2Meter(canvas.height - 1)))
						//The ship starts by beeing thrown upward.
						.setDirection(-Math.PI / 2.0)
						.setVelocity(Vector2D.create(0.0, -5));
					this.drawObjectManager.add(this.ship);
					this.machineGun = MachineGun.create(
						this.ship, Bullet, this.drawObjectManager);

					//Enemy
					this.enemy = SimpleEnemy.create(
						this.ship,
						{},
						ImageDrawObject.create(images.get('images/Reisen.png')).setScale(0.4));
					this.drawObjectManager.add(this.enemy);

					//Start the game after loading the image
					let luftrauzerLike = this;
					Scheduler.create(Time.create())
						.callByInterval(
							(elapsedTimeSecond) => { luftrauzerLike.gameLoop(elapsedTimeSecond); },
							FRAME_TIME_MILLISECOND);

				},

				gameLoop(elapsedTimeSecond) {

					this.enemy.update(elapsedTimeSecond);

					this.ship.update(elapsedTimeSecond);

					this.machineGun.update(elapsedTimeSecond);

					//Keep in the screen
					let canvas = document.getElementById("canvas");
					if (this.ship.getPosition().x >= ScreenConversion.pixel2Meter(canvas.width)) {
						this.ship.getPosition().x = ScreenConversion.pixel2Meter(canvas.width - 1);
						this.ship.velocity.x = 0;
						this.ship.velocity.y = 0;
					}
					if (this.ship.getPosition().x < 0) {
						this.ship.getPosition().x = 0;	
						this.ship.velocity.x = 0;
						this.ship.velocity.y = 0;
					}
					if (this.ship.getPosition().y >= ScreenConversion.pixel2Meter(canvas.height)) {
						this.ship.getPosition().y = ScreenConversion.pixel2Meter(canvas.height -1);
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

					this.drawObjectManager.draw(canvasContext);
				}
			});
	}

};


