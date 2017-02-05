"use strict";

{ //Test 'applyCollision'
  let util = Util.create();

  let gameObjectFactory = (position) => {
    return {
      position: position,
      counter: 0,
      getPosition() {
        return this.position;
      },
      setPosition(position) {
        this.position = position;
        return this;
      },
      getRadius() {
        return 0.5;
      },
      collide() {
        this.counter++;
        return this;
      }
    };
  }

  let gameObjects = new Array(
    gameObjectFactory(Vector2D.create(0.0, 0.0)),
    gameObjectFactory(Vector2D.create(10.0, 20.0)),
    gameObjectFactory(Vector2D.create(11.0, 20.0)),
    gameObjectFactory(Vector2D.create(10.0, 21.0))
  );

  let collisionManager = CollisionManager.create(gameObjects).applyCollision();

  util.assert(gameObjects[0].counter == 0);
  util.assert(gameObjects[1].counter == 2);
  util.assert(gameObjects[2].counter == 1);
  util.assert(gameObjects[3].counter == 1);
}

