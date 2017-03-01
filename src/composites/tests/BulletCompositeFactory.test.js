"use strict";

{ //Test "BulletCompositeFactory"
  const util = Util.create();

  const bullet = { };
  const bulletFactory = {
    create() {
      return bullet;
    },
  };

  const explosion = {
    scale: 1.0,
    setScale(scale) {
      util.assert(scale == 0.5);
      this.scale = scale;
      return this;
    },
  };
  const explosionFactory = {
    create() {
      return explosion;
    },
  };

  const gameObjectDrawObjectFactory = {
    create(drawObject, gameObject) {
      return {
        getGameObject() { return gameObject; },
        getDrawObject() { return drawObject; },
      };
    }
  };

  const gameObjectManager = {
    push(gameObject) {
      this.gameObject = gameObject;
      return this;
    },
  };

  const drawObjectManager = {
    add(drawObject) {
      this.drawObject = drawObject;
      return this;
    },
  };

  const bulletComposite = BulletCompositeFactory(
          bulletFactory,
          explosionFactory,
          gameObjectDrawObjectFactory,
          gameObjectManager,
          drawObjectManager)
      .create();

  util.assert(bullet == bulletComposite.getGameObject());
  util.assert(explosion == bulletComposite.getDrawObject());
  util.assert(explosion.scale == 0.5);
  util.assert(gameObjectManager.gameObject == bulletComposite);
  util.assert(drawObjectManager.drawObject == explosion);
}
