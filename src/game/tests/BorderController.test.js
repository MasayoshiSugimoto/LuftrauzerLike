"use strict";

{ //Test that the ship turn left when it is pointing up/right
  const util = Util.create();

  const ship = {
    direction: -Math.PI / 4.0, //up right
    setDirection(direction) {
      this.direction = direction;
    },
    getDirection() {
      return this.direction;
    },
    getPosition() {
      return Vector2D.create(1000.0, 0.0);
    },
  };

  const borderController = BorderController("controller", GameMap())
      .setShip(ship);

  util.assert(borderController.autoDirection() == "left");
}

{ //Test that the ship turn right when it is pointing down right
  const util = Util.create();

  const ship = {
    direction: Math.PI / 4.0, //down right
    getDirection() {
      return this.direction;
    },
    getPosition() {
      return Vector2D.create(1000.0, 0.0);
    },
  };

  const borderController = BorderController("controller", GameMap())
      .setShip(ship);

  util.assert(borderController.autoDirection() == "right");
}
