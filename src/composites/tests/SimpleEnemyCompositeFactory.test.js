"use strict";

{ //Test 'SimpleEnemyCompositeFactory'
  let util = Util.create();

  let simpleEnemy = { };
  let simpleEnemyFactory = {
    create() {
      return simpleEnemy;
    }
  };
  let expectedImage = { };
  let imageDrawObject = {
    scale: 0.0,
    setScale(scale) {
      this.scale = scale;
      return this;
    }
  };
  let imageDrawObjectFactory = {
    create(image) {
      util.assert(image == expectedImage);
      return imageDrawObject;
    }
  };
  let gameObjectDrawObjectFactory = {
    create(drawObject, gameObject) {
      return {
        drawObject: drawObject,
        gameObject: gameObject
      };
    }
  };
  let images = new Map();
  images.set('images/Reisen.png', expectedImage);
  let drawObjectManager = {
    drawObject: null,
    add(drawObject) {
      this.drawObject = drawObject;
    }
  }

  let simpleEnemyComposite = SimpleEnemyCompositeFactory(
        simpleEnemyFactory,
        imageDrawObjectFactory,
        gameObjectDrawObjectFactory,
        images,
        drawObjectManager)
      .create();
  util.assert(simpleEnemyComposite.drawObject.scale == 0.4);
  util.assert(simpleEnemyComposite.gameObject == simpleEnemy);
  util.assert(drawObjectManager.drawObject == simpleEnemyComposite);
}
