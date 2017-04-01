"use strict";

const AnimationDrawObjectTest = {
  images: [
    {
      width: 10,
      height: 20,
    },
    {
      width: 11,
      height: 21,
    },
    {
      width: 12,
      height: 22,
    },
  ]
};

{ //getScreenPosition/setScreenPosition
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject.create(null)
      .setScreenPosition("screenPosition");

  util.assert(animationDrawObject.getScreenPosition() == "screenPosition");
}

{ //getDirection/setDirection
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject.create(null)
      .setDirection("direction");

  util.assert(animationDrawObject.getDirection() == "direction");
}


{ //getScale/setScale
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject.create(null)
      .setScale("scale");
  util.assert(animationDrawObject.getScale() == "scale");
}

{ //Check that the current image used is the one set
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject.create(AnimationDrawObjectTest.images)
      .setCurrentImageIndex(1);

  util.assert(animationDrawObject.getCurrentImage().width == 11);
}

{ //getSize()
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject.create(AnimationDrawObjectTest.images)
      .setCurrentImageIndex(2)
      .setScale(2.0);

  util.assert(animationDrawObject.getSize().equals(Vector2D.create(24,44)));
}

{ //draw()
  const util = Util.create();

  const canvasContext = {
    globalAlpha: 1.0,
    drawImage(image, x, y, width, height) {
      util.assert(image == AnimationDrawObjectTest.images[0]);
      util.assert(x == -10);
      util.assert(y == -20);
      util.assert(width == 20);
      util.assert(height == 40);
      this.drawImageCalled = true;
      return this;
    },
  };

  const animationDrawObject = AnimationDrawObject.create(AnimationDrawObjectTest.images)
      .setScale(2.0);
      
  animationDrawObject.draw(canvasContext);
  util.assert(canvasContext.globalAlpha == 1.0);
  util.assert(canvasContext.drawImageCalled);
}
