{ //Test 'getGameObject'
  let util = Util.create();

  let gameObject = { };

  util.assert(gameObject == GameObjectDrawObject.create({ }, gameObject).getGameObject());
}

{ //Test 'getPosition'
  let util = Util.create();

  let gameObject = {
    getPosition() {
      return Vector2D.create(1.0, 2.0);
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create({}, gameObject);

  util.assertEqualFloat(PIXEL_PER_METER, gameObjectDrawObject.getPosition().getX());
  util.assertEqualFloat(2 * PIXEL_PER_METER, gameObjectDrawObject.getPosition().getY());
}

{ //Test 'setPosition'
  let util = Util.create();

  let gameObject = {
    setPosition(position) {
      util.assertEqualFloat(100 / PIXEL_PER_METER, position.getX());
      util.assertEqualFloat(200 / PIXEL_PER_METER, position.getY());
    },
  };

  let gameObjectDrawObject = GameObjectDrawObject.create({ }, gameObject);
  util.assert(gameObjectDrawObject.setPosition(Vector2D.create(100.0, 200.0)) == gameObjectDrawObject);
}

{ //Test 'setScale'
  let util = Util.create();

  let drawObject = {
    setScale(scale) {
      util.assertEqualFloat(1.0, scale);
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create(drawObject, { });
  util.assert(gameObjectDrawObject.setScale(1.0) == gameObjectDrawObject);
}

{ //Test 'getDirection' and setDirection
  let util = Util.create();

  let gameObject = {
    direction: 0.0,
    getDirection() {
      return this.direction;
    },
    setDirection(direction) {
      this.direction = direction;
      return this;
    },
  };

  let gameObjectDrawObject = GameObjectDrawObject.create({ }, gameObject)
      .setDirection(2.0);
  util.assertEqualFloat(2.0, gameObjectDrawObject.getDirection());
}

{ //Test 'getSize'
  let util = Util.create();

  let expectedSize = { };

  let drawObject = {
    getSize() {
      return expectedSize;
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create(drawObject, { });

  util.assert(gameObjectDrawObject.getSize() == expectedSize);
}

{ //Test 'setOpacity'
  let util = Util.create();

  let drawObject = {
    setOpacity(opacity) {
      util.assertEqualFloat(1.0, opacity);
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create(drawObject, { });
  util.assert(gameObjectDrawObject.setOpacity(1.0) == gameObjectDrawObject);
}

{ //Test 'placeOn'
  let util = Util.create();

  let expectedCanvasContext = { };

  let gameObject = {
    placeOn(canvasContext) {
      util.assert(canvasContext == expectedCanvasContext);
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create({ }, gameObject);
  util.assert(gameObjectDrawObject.placeOn(expectedCanvasContext) == gameObjectDrawObject);
}

{ //Test 'draw'
  let util = Util.create();

  let expectedCanvasContext = { };

  let drawObject = {
    draw(canvasContext) {
      util.assert(canvasContext == expectedCanvasContext);
    }
  };

  let gameObject = {
    isDead() {
      return false;
    }
  };

  let gameObjectDrawObject = GameObjectDrawObject.create(drawObject, gameObject);

  util.assert(gameObjectDrawObject.draw(expectedCanvasContext) == gameObjectDrawObject);
}

{ //Test 'GameObjectDrawObjectFactory'
  let util = Util.create();

  let explosionDrawObjectFactory = { };
  let emptyGameObjectFactory = { };
  let drawObject = { };
  let gameObject = { };

  let factory = GameObjectDrawObjectFactory(explosionDrawObjectFactory, emptyGameObjectFactory);
  let gameObjectDrawObject = factory.create(drawObject, gameObject);

  util.assert(gameObjectDrawObject.drawObject == drawObject);
  util.assert(gameObjectDrawObject.gameObject == gameObject);
  util.assert(gameObjectDrawObject.factory == factory);
  util.assert(gameObjectDrawObject.activeDrawObject == drawObject);
  util.assert(gameObjectDrawObject.activeGameObject == gameObject);
  util.assert(gameObjectDrawObject.factory.getExplosionDrawObjectFactory() == explosionDrawObjectFactory);
  util.assert(gameObjectDrawObject.factory.getEmptyGameObjectFactory() == emptyGameObjectFactory);
}

{ //Test 'update'
  let util = Util.create();

  let explosionDrawObject = {
    isDrawCalled: false,
    draw(canvasContext) {
      this.isDrawCalled = true;
    }
  };
  let explosionDrawObjectFactory = {
    create() {
      return explosionDrawObject;
    }
  };
  let expectedEmptyGameObject = { };
  let emptyGameObjectFactory = {
    create(position, direction) {
      return expectedEmptyGameObject;
    }
  };
  let drawObject = { };
  let gameObject = {
    died: false,
    isDead() {
      return this.died;
    },
    getPosition() {
      return Vector2D.zero();
    },
    getDirection() {
      return 0.0;
    }
  };

  let gameObjectDrawObject = GameObjectDrawObjectFactory(explosionDrawObjectFactory, emptyGameObjectFactory)
      .create(drawObject, gameObject);

  util.assert(gameObjectDrawObject.activeDrawObject == drawObject);
  util.assert(gameObjectDrawObject.activeGameObject == gameObject);
  gameObject.died = true;
  gameObjectDrawObject.draw( { } );
  util.assert(gameObjectDrawObject.activeDrawObject == explosionDrawObject);
  util.assert(gameObjectDrawObject.activeGameObject == expectedEmptyGameObject);
  util.assert(explosionDrawObject.isDrawCalled);
}

{ //Test 'toDelete'
  let util = Util.create();

  let drawObject = {
    toBeDeleted: false,
    toDelete() {
      return this.toBeDeleted;
    }
  };

  let gameObject = {
    dead: false,
    isDead() {
      return this.dead;
    }
  };

  let factory = {
  };

  let gameObjectDrawObject = GameObjectDrawObject.create(drawObject, gameObject, factory);

  util.assert(!gameObjectDrawObject.toDelete());
  gameObject.dead = true;
  drawObject.toBeDeleted = true;
  util.assert(gameObjectDrawObject.toDelete());
}
