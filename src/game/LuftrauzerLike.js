"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const GRAVITY_CONSTANT						= 9.80665;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);

const LuftrauzerLike = {

	create() {

		return {
      initializer       :  Initializer,
			machineGun        :  null,
			enemy             :  null,

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
				CloudGenerator.create(this.initializer.getDrawObjectManager(), images, Cloud, ImageDrawObject);

        this.initializer.getShip()
					//The ship starts at the bottom of the screen, horizontaly centered.
					.setPosition(Vector2D.create(
							ScreenConversion.pixel2Meter(canvas.width / 2),
							ScreenConversion.pixel2Meter(canvas.height - 1)))
					//The ship starts by beeing thrown upward.
					.setDirection(-Math.PI / 2.0)
					.setVelocity(Vector2D.create(0.0, -5));
        let gameObjectDrawObjectFactory = GameObjectDrawObjectFactory(
            ExplosionDrawObject.create(images.get('images/Explosion.png')),
            EmptyGameObject);
				this.initializer.getDrawObjectManager().add(gameObjectDrawObjectFactory.create(
					ImageDrawObject.create(images.get('images/Reisen.png')),
					this.initializer.getShip()));
        this.machineGun = MachineGunFactory.create(Bullet, this.initializer.getDrawObjectManager(), GameObjectDrawObject)
            .createMachineGun(this.initializer.getShip());

				//Enemy
				this.enemy = SimpleEnemy.create(this.initializer.getShip(), {});
				this.initializer.getDrawObjectManager().add(gameObjectDrawObjectFactory.create(
					ImageDrawObject.create(images.get('images/Reisen.png')).setScale(0.4),
					this.enemy
				));
        this.initializer.getGameObjectManager().push(this.enemy);

				//Start the game after loading the image
				let luftrauzerLike = this;
				Scheduler.create(Time.create())
					.callByInterval(
						(elapsedTimeSecond) => { luftrauzerLike.gameLoop(elapsedTimeSecond); },
						FRAME_TIME_MILLISECOND);

			},

			gameLoop(elapsedTimeSecond) {

				this.initializer.getShip().update(elapsedTimeSecond);
				this.enemy.update(elapsedTimeSecond);
				this.machineGun.update(elapsedTimeSecond);
        this.initializer.getGameMap().keepAllGameObjectsInMap();
        this.initializer.getCollisionManager().applyCollision();

				//Keep in the screen
				let canvas = document.getElementById("canvas");

				let canvasContext = canvas.getContext("2d"); //Get the draw context
				canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

				canvasContext.fillStyle = "#66ccff"; //Blue sky color
				canvasContext.fillRect(0,0,canvas.width, canvas.height); //Blue sky background

				this.initializer.getCamera().update();	
				this.initializer.getDrawObjectManager().draw(this.initializer.getCamera());
			}
		};
	}

};


