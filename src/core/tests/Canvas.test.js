"use strict";

{ // Test 'getCenter'
  const util = Util.create();

  const underlyingCanvas = {
    width: 1.0,
    height: 2.0,
  };

  const center = Canvas.create(underlyingCanvas).getCenter();

  util.assert(center.getX() == 0.5);
  util.assert(center.getY() == 1.0);
}

{ //Test 'center'
  const util = Util.create();

  const underlyingCanvas = {
    width: 10,
    height: 20,
  };

  const drawObject = {
    setPosition(position) {
      this.position = position;
    }
  };

  Canvas.create(underlyingCanvas).center(drawObject);

  util.assert(drawObject.position.equals(Vector2D.create(5, 10)));
}
