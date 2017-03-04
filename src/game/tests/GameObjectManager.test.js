"use strict";

{ //Test 'push'
  let util = Util.create();

  let expectedGameObject = { };

  let called = false;
  let gameObjectManager = GameObjectManager.create()
      .push(expectedGameObject);
  util.assert(gameObjectManager.gameObjects.length == 1);
}

{ // Test 'update'
  let util = Util.create();

  let gameObjectManager = GameObjectManager.create()
    .push( {
        toDelete() {
          return true;
        },
        update(elapsedTime) {
          util.assert(false);
        },
      } )
    .push( {
        called: false,
        toDelete() {
          return false;
        },
        update(elapsedTime) {
          util.assert(elapsedTime == 1.23);
          this.called = true;
        },
      } )
    .update(1.23);
  util.assert(gameObjectManager.gameObjects[0].called);
}

{ //Test 'remove'
  const util = Util.create();

  const gameObject = "gameObject";

  const gameObjectManager = GameObjectManager.create().push(gameObject);

  util.assert(gameObjectManager.length() == 1);
  util.assert(gameObjectManager.remove(gameObject) == gameObjectManager);
  util.assert(gameObjectManager.length() == 0);
}
