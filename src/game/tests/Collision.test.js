"use strict";

function CollisionTest() {
}

CollisionTest.allEnemyFaction = {
  isEnemy(actor1, actor2) {
    return true;
  }
};

{ //Test 'applyCollision'
  const util = Util.create();

  const gameObjectFactory = (position) => {
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
      },
    };
  }

  const gameObjects = new Array(
    gameObjectFactory(Vector2D.create(0.0, 0.0)),
    gameObjectFactory(Vector2D.create(10.0, 20.0)),
    gameObjectFactory(Vector2D.create(11.0, 20.0)),
    gameObjectFactory(Vector2D.create(10.0, 21.0))
  );

  const collisionManager = CollisionManager.create(gameObjects, CollisionTest.allEnemyFaction)
      .applyCollision();

  util.assert(gameObjects[0].counter == 0);
  util.assert(gameObjects[1].counter == 2);
  util.assert(gameObjects[2].counter == 1);
  util.assert(gameObjects[3].counter == 1);
}

{ //Test 'create' test
  const util = Util.create();

  const gameObjectFactory = {

    create(collidable) {
      if (collidable) {
        return {
          collide() { }
        };
      } else {
        return { };
      }
    }

  };

  const gameObjects = [
    gameObjectFactory.create(true),
    gameObjectFactory.create(false),
    gameObjectFactory.create(true),
    gameObjectFactory.create(false),
    gameObjectFactory.create(true)
  ];

  const collisionManager = CollisionManager.create(gameObjects, CollisionTest.allEnemyFaction);

  const callbackObject = {
    counter: 0,
    create() {
      const factory = this;
      return () => {
        factory.counter++;
      };
    }
  };

  collisionManager.collisionableObjects.forEach(callbackObject.create());

  util.assert(callbackObject.counter == 3);
}

{ //Test that objects without collide function are ignored.
  const util = Util.create();

  const gameObjects = ["gameObject"];

  //Will fail if the gameObjects without 'collide' function are not ignored.
  CollisionManager.create(gameObjects).applyCollision();
}

{ //Test collision with faction
  const util = Util.create();

  //Created GameObjects share the same position, they will collide without faction.
  const gameObjectFactory = {
    create() {
      return {
        counter: 0,
        collide() {
          this.counter++;
        },
        getPosition() { return Vector2D.zero(); },
        getRadius() { return 1.0; },
      };
    }
  };

  const gameObjects = [
    gameObjectFactory.create(),
    gameObjectFactory.create(),
    gameObjectFactory.create(),
  ];

  const faction = {
    isEnemy(actor1, actor2) {
      if (actor1 == actor2) {
        return false;
      }
      if ((actor1 == gameObjects[1] && actor2 == gameObjects[2])
       || (actor1 == gameObjects[2] && actor2 == gameObjects[1])) {
        return false;
      }
      return true;
    }
  };

  const collisionManager = CollisionManager.create(gameObjects, faction).applyCollision();

  util.assert(2 == gameObjects[0].counter);
  util.assert(1 == gameObjects[1].counter);
  util.assert(1 == gameObjects[2].counter);
}
