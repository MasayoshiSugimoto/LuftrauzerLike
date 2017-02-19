"use strict";

const FRAME_TIME_MILLISECOND			= 1000.0 / 60.0;
const GRAVITY_CONSTANT						= 9.80665;
const GRAVITY_VECTOR 							= Vector2D.create(0,GRAVITY_CONSTANT);

const LuftrauzerLike = {

	create() {

		return {
      initializer       :  null,

			//First function to be called.
			//Setup the game before starting the game loop
			//This function is only called once at startup
			startGame() {
				let that = this;
				ImageLoader.load(ImageFactory, IMAGE_DATA, (images) => { that.onImagesLoaded(images); });
			},

			onImagesLoaded(images) {

        this.initializer = Initializer(images);

				Keyboard.setup(this.initializer);

				//Clouds
				CloudGenerator.create(this.initializer.getDrawObjectManager(), images, Cloud, ImageDrawObject);

        this.initializer.getShip()
					//The ship starts at the bottom of the screen, horizontaly centered.
					.setPosition(Vector2D.create(
							ScreenConversion.pixel2Meter(this.initializer.getCanvas().getWidth() / 2),
							ScreenConversion.pixel2Meter(this.initializer.getCanvas().getHeight() - 1)))
					//The ship starts by beeing thrown upward.
					.setDirection(-Math.PI / 2.0)
					.setVelocity(Vector2D.create(0.0, -5));
				this.initializer.getDrawObjectManager().add(this.initializer.getGameObjectDrawObjectFactory().create(
					ImageDrawObject.create(images.get('images/Reisen.png')),
					this.initializer.getShip()));

				//Enemy
        EnemyPopper.create(this.initializer.getSimpleEnemyCompositeFactory(), window);

				//Start the game after loading the image
				let luftrauzerLike = this;
				Scheduler.create(Time.create())
					.callByInterval(
						(elapsedTimeSecond) => { luftrauzerLike.gameLoop(elapsedTimeSecond); },
						FRAME_TIME_MILLISECOND);

			},

			gameLoop(elapsedTimeSecond) {

				this.initializer.getMachineGun().update(elapsedTimeSecond);
        this.initializer.getGameObjectManager().update(elapsedTimeSecond);
        this.initializer.getCollisionManager().applyCollision();
        this.initializer.getGameMap().keepAllGameObjectsInMap();

				this.initializer.getCanvas()
            .clear()
            .setBackgroundColor("#66ccff");

				this.initializer.getCamera().update();	
				this.initializer.getDrawObjectManager().draw(this.initializer.getCamera(), elapsedTimeSecond);
			}
		};
	}

};


