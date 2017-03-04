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
  util.assert(drawObjectManager.drawObject == bulletComposite);
}

{ //Test bullet composite deletion
  const util = Util.create();

  const bullet = { };
  const bulletFactory = {
    create() { return bullet; },
  };

  const explosion = {
    setScale(scale) { }
  };
  const explosionFactory = {
    create() { return explosion; }
  };

  const gameObjectDrawObject = {
    getDrawObject() {
      return explosion;
    },
  };
  const gameObjectDrawObjectFactory = {
    create() {
      return gameObjectDrawObject;
    },
  };

  const gameObjectManager = {
    length: 0,
    push(gameObject) {
      this.length++; 
    },
    remove(gameObject) {
      util.assert(gameObject == bulletComposite);
      this.length--;
    },
  };

  const drawObjectManager = {
    length: 0,
    add(drawObject) {
      this.length++;
    },
    remove(drawObject) {
      util.assert(drawObject == bulletComposite);
      this.length--;
    }
  };

  const bulletCompositeFactory = BulletCompositeFactory(
      bulletFactory,
      explosionFactory,
      gameObjectDrawObjectFactory,
      gameObjectManager,
      drawObjectManager);
  const bulletComposite = bulletCompositeFactory.create();
  bulletCompositeFactory.dispose(bulletComposite);

  util.assert(gameObjectManager.length == 0);
  util.assert(drawObjectManager.length == 0);
}
