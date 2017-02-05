"use strict";

{
  let util = Util.create();

  let gameMap = GameMap.create();

  //Test 'getSize'
  util.assertEqualFloat(gameMap.getXSizeMeter(), gameMap.getSize().getX());
  util.assertEqualFloat(gameMap.getYSizeMeter(), gameMap.getSize().getY());

  //Test 'getXSizeMeter'
  util.assertEqualFloat(gameMap.getXSizeMeter(), gameMap.getXSizeMeter());

  //Test 'getYSizeMeter'
  util.assertEqualFloat(gameMap.getYSizeMeter(), gameMap.getYSizeMeter());
}

{ //Test 'keepInMap'
  let util = Util.create();

  let gameObject = {
    position: null,
    getPosition() {
      return this.position;
    },
    setPosition(position) {
      this.position = position;
      return this;
    }
  };

  let gameMap = GameMap.create();

  gameObject.position = Vector2D.create(0.0, 0.0);

  util.assert(gameMap == gameMap.keepInMap(gameObject));

  //gameObject is already inside
  util.assert(gameObject.getPosition().equals(Vector2D.create(0.0, 0.0)));

  //gameObject is on left side
  gameObject.position = Vector2D.create(-gameMap.getXSizeMeter() - 0.1, 0.0);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(-gameMap.getXSizeMeter(), 0.0)));

  //gameObject is on top/left side
  gameObject.position = Vector2D.create(-gameMap.getXSizeMeter() - 0.1, -gameMap.getYSizeMeter() - 0.1);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(-gameMap.getXSizeMeter(), -gameMap.getYSizeMeter())));

  //gameObject is on top side
  gameObject.position = Vector2D.create(0.0, -gameMap.getYSizeMeter() - 0.1);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(0.0, -gameMap.getYSizeMeter())));

  //gameObject is on top/right side
  gameObject.position = Vector2D.create(gameMap.getXSizeMeter() + 0.1, -gameMap.getYSizeMeter() - 0.1);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(gameMap.getXSizeMeter(), -gameMap.getYSizeMeter())));

  //gameObject is on right side
  gameObject.position = Vector2D.create(gameMap.getXSizeMeter() + 0.1, 0.0);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(gameMap.getXSizeMeter(), 0.0)));

  //gameObject is on bottom/right side
  gameObject.position = Vector2D.create(gameMap.getXSizeMeter() + 0.1, gameMap.getYSizeMeter() + 0.1);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(gameMap.getXSizeMeter(), gameMap.getYSizeMeter())));

  //gameObject is on bottom side
  gameObject.position = Vector2D.create(0.0, gameMap.getYSizeMeter() + 0.1);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(0.0, gameMap.getYSizeMeter())));

  //gameObject is on bottom/left side
  gameObject.position = Vector2D.create(-gameMap.getXSizeMeter() - 0.1, 0.0);
  gameMap.keepInMap(gameObject);
  util.assert(gameObject.position.equals(Vector2D.create(-gameMap.getXSizeMeter(), 0.0)));
}

{ //Test 'keepAllGameObjectsInMap'
  let util = Util.create();

  let gameObjectFactory = () => {
    return {
      position: Vector2D.create(GameMap.getXSizeMeter() + 0.1, GameMap.getYSizeMeter() + 0.1),
      getPosition() {
        return this.position;
      },
      setPosition(position) {
        this.position = position;
        return this;
      }
    };
  };

  let gameObjectManager = [
    gameObjectFactory(),
    gameObjectFactory(),
    gameObjectFactory()
  ];

  let gameMap = GameMap.create(gameObjectManager).keepAllGameObjectsInMap();

  gameObjectManager.forEach( (gameObject) => {
    util.assert(gameObject.getPosition().getX() == GameMap.getXSizeMeter());
    util.assert(gameObject.getPosition().getY() == GameMap.getYSizeMeter());
  } );
}
