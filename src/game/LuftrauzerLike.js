"use strict";

const GRAVITY_CONSTANT            = 9.80665;
const GRAVITY_VECTOR              = Vector2D.create(0,GRAVITY_CONSTANT);

const LuftrauzerLike = {

  create() {

    return {

      //First function to be called.
      //Setup the game before starting the game loop
      //This function is only called once at startup
      startGame() {
        const that = this;
        const onImagesLoaded = (images) => {
          that.sharedInitializer = SharedInitializer(images);
          StartMenu.create(images, window, () => { that.startPlay(images); }, that.sharedInitializer);
        };
        ImageLoader.load(ImageFactory, IMAGE_DATA, onImagesLoaded);
      },

      startPlay(images) {

        this.initializer = Initializer(images);

        GameKeyboardHandler.setup(this.initializer);

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
        this.initializer.getShipComposite() //Create a composite.

        //Enemy
        EnemyPopper.create(this.initializer.getSimpleEnemyCompositeFactory(), window);

        //Start the game after loading the image
        const luftrauzerLike = this;
        this.sharedInitializer.getScheduler().setGameLoop(
            (elapsedTimeSecond) => { luftrauzerLike.gameLoop(elapsedTimeSecond); });
      },

      gameLoop(elapsedTimeSecond) {

        this.sharedInitializer.getFrameCounter().increment();
        this.sharedInitializer.getDebugMenu()
            .setDrawObjectManagerSize(this.initializer.getDrawObjectManager().length());
        this.sharedInitializer.getDebugMenu()
            .setGameObjectManagerSize(this.initializer.getGameObjectManager().length());

        this.initializer.getMachineGun().update(elapsedTimeSecond);
        this.initializer.getGameObjectManager().update(elapsedTimeSecond);
        this.initializer.getCollisionManager().applyCollision();
        this.initializer.getGameMap().keepAllGameObjectsInMap();

        this.initializer.getCanvas()
            .fullScreen()
            .clear()
            .setBackgroundColor("#66ccff");

        this.initializer.getCamera().update();
        this.initializer.getDrawObjectManager().draw(this.initializer.getCamera(), elapsedTimeSecond);
      }
    };
  }

};


