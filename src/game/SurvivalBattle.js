"use strict";

const SurvivalBattle = {

  create(images, sharedInitializer) {
    const survivalBattle = Object.assign({
        images: images,
        sharedInitializer: sharedInitializer,
      }, this.proto);
    survivalBattle.initialize();
    return survivalBattle;
  },

  proto: {
    initialize() {
      this.initializer = Initializer(this.images);
      GameKeyboardHandler.setup(this.initializer);

      //Clouds
      CloudGenerator.create(this.initializer.getDrawObjectManager(), this.images, Cloud, ImageDrawObject);

      //Ship
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
      const that = this;
      this.sharedInitializer.getGameLoop().setGameLoop(
          (elapsedTimeSecond) => { that.update(elapsedTimeSecond); });
    },

    update(elapsedTimeSecond) {

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
    },
  },
};
