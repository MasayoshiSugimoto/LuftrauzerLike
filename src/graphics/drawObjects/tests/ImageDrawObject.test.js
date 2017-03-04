"use strict";

const TestImageDrawObject = {

  util: Util.create()

};

{ //Test placeOn

  let imageDrawObject = ImageDrawObject.create({});
  imageDrawObject.setScreenPosition(Vector2D.create(10, 20));
  imageDrawObject.setDirection(3.0);

  let previousFunction = "";

  let canvasContext = {
    translate(x, y) {
      TestImageDrawObject.util.assert(previousFunction == "");
      previousFunction = "translate"
      TestImageDrawObject.util.assert(x == 10);
      TestImageDrawObject.util.assert(y == 20);
    },
    rotate(direction) {
      TestImageDrawObject.util.assert(previousFunction == "translate");
      previousFunction = "rotate";
      TestImageDrawObject.util.assert(direction == 3.0);
    }
  };

  imageDrawObject.placeOn(canvasContext);
  TestImageDrawObject.util.assert(previousFunction == "rotate");
}

{ //Test draw

  let expectedImage = {
    width: 10,
    height: 20
  };

  let imageDrawObject = ImageDrawObject.create(expectedImage).setScale(10);

  let previousFunction = "";

  let canvasContext = {
    drawImage(image, x, y, width, height) {
      TestImageDrawObject.util.assert(previousFunction == "");
      previousFunction = "drawImage";
      TestImageDrawObject.util.assert(image == expectedImage);
      TestImageDrawObject.util.assert(x == -50);
      TestImageDrawObject.util.assert(y == -100);
      TestImageDrawObject.util.assert(width == 100);
      TestImageDrawObject.util.assert(height == 200);
    }
  };

  imageDrawObject.draw(canvasContext);
  TestImageDrawObject.util.assert(previousFunction == "drawImage");

}

{  //Test getSize
  let image = {
    width: 1,
    height: 2
  };
  let size = ImageDrawObject.create(image).setScale(10).getSize();

  TestImageDrawObject.util.assert(size.getX() == 10);
  TestImageDrawObject.util.assert(size.getY() == 20);
}
