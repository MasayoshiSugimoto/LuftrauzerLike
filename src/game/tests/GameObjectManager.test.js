"use strict";

{ //Test 'push'
  let util = Util.create();

  let expectedGameObject = { };

  let called = false;
  let gameObjectManager = GameObjectManager.create()
      .push(expectedGameObject)
      .forEach( (gameObject) => {
        util.assert(gameObject == expectedGameObject);
        called = true;
      });
  util.assert(called);
}

{ // Test 'clean'
  let util = Util.create();

  let gameObjectManager = GameObjectManager.create()
    .push( {
        toDelete() {
          return true;
        }
      } )
    .push( {
        toDelete() {
          return false;
        }
      } )
    .clean();
  util.assert(gameObjectManager.gameObjects.length == 1);
}
