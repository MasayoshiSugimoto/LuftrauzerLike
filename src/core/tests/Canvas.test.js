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
    setScreenPosition(position) {
      this.position = position;
    }
  };

  Canvas.create(underlyingCanvas).center(drawObject);

  util.assert(drawObject.position.equals(Vector2D.create(5, 10)));
}

{ //Test 'fullScreen'
  const util = Util.create();

  const underlyingCanvas = {
    parentElement: {
      style: {
        margin: -1,
      }
    }
  };
  const windowObject = {
    innerWidth: 1.0,
    innerHeight: 2.0,
  };

  const canvas = Canvas.create(underlyingCanvas, windowObject).fullScreen();

  util.assert(canvas.getWidth() == 1.0);
  util.assert(canvas.getHeight() == 2.0);
  util.assert(underlyingCanvas.parentElement.style.margin == 0);
}

{ //Test 'getGameSpaceCenter'
  const util = Util.create();

  const canvas = {
    width: ScreenConversion.meter2Pixel(1.0),
    height: ScreenConversion.meter2Pixel(2.0),
  };

  const center = Canvas.create(canvas, { })
      .getGameSpaceCenter();

  util.assertEqualFloat(center.getX(), 0.5);
  util.assertEqualFloat(center.getY(), 1.0);
}
