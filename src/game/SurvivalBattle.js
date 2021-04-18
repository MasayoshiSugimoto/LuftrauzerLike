"use strict";

const SurvivalBattle = {

  create(sharedInitializer, onEndCallback) {
    const survivalBattle = Object.assign({
        sharedInitializer: sharedInitializer,
        onEndCallback: onEndCallback,
      }, this.proto);
    survivalBattle.initialize();
    return survivalBattle;
  },

  proto: {
    initialize() {
      this.initializer = Initializer(this.sharedInitializer.getImages());

      //Clouds
      CloudGenerator.create(this.initializer.getDrawObjectManager(), this.sharedInitializer.getImages(), Cloud, ImageDrawObject);

      //Ship
      this.initializer.getShip()
        //The ship starts at the bottom of the screen, horizontaly centered.
        .setPosition(Vector2D.create(
            ScreenConversion.pixel2Meter(this.initializer.getCanvas().getWidth() / 2),
            ScreenConversion.pixel2Meter(this.initializer.getCanvas().getHeight() - 1)))
        //The ship starts by beeing thrown upward.
        .setDirection(-Math.PI / 2.0);
      this.initializer.getShip().velocity = Vector2D.create(0.0, -5);
      this.initializer.getShipComposite() //Create a composite.

      //Enemy
      EnemyPopper.create(
          this.initializer.getSimpleEnemyCompositeFactory(),
          window,
          this.initializer.getCamera());

      //Sea
      this.sea = Sea(this.initializer.getCanvas(), this.initializer.getCamera(), GameMap());

      //Start the game after loading the image
      const that = this;
      this.update = this.playingLoop;
      this.sharedInitializer.getGameLoop().setGameLoop(
          (elapsedTimeSecond) => { that.update(elapsedTimeSecond); });
    },

    playingLoop(elapsedTimeSecond) {
      this.sharedLoop(elapsedTimeSecond);
      if (this.initializer.getShip().isDead()) {
        const that = this;
        window.setTimeout(that.onEndCallback, 3000/*milliseconds*/);
        this.update = this.sharedLoop;
      }
    },

    sharedLoop(elapsedTimeSecond) {
      this.sharedInitializer.getFrameCounter().increment();
      this.sharedInitializer.getDebugMenu()
          .setDrawObjectManagerSize(this.initializer.getDrawObjectManager().length());
      this.sharedInitializer.getDebugMenu()
          .setGameObjectManagerSize(this.initializer.getGameObjectManager().length());

      this.initializer.getMachineGun().update(elapsedTimeSecond);
      this.initializer.getEntityManager().update(elapsedTimeSecond);
      this.initializer.getGameObjectManager().update(elapsedTimeSecond);
      this.initializer.getCollisionManager().applyCollision();

      this.initializer.getCanvas()
          .fullScreen()
          .clear()
          .setBackgroundColor("#66ccff");

      this.initializer.getCamera().update();
      this.initializer.getDrawObjectManager().draw(this.initializer.getCamera(), elapsedTimeSecond);

      this.sea.draw();
    },

  },
};
