"use strict";

const AnimationDrawObjectTest = {
  images: [],
  emptyShip: {
    getDirection() { return 0.0; }
  },
};
for (let i = 0; i < 31; i++) {
  AnimationDrawObjectTest.images.push({
    width: 100 + i,
    height: 200 + i,
  });
}

{ //getScreenPosition/setScreenPosition
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject
      .create(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip)
      .setScreenPosition("screenPosition");

  util.assert(animationDrawObject.getScreenPosition() == "screenPosition");
}

{ //getDirection/setDirection
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject
      .create(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip)
      .setDirection("direction");

  util.assert(animationDrawObject.getDirection() == "direction");
}


{ //getScale/setScale
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject
      .create(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip)
      .setScale("scale");
  util.assert(animationDrawObject.getScale() == "scale");
}

{ //getSize()
  const util = Util.create();

  const animationDrawObject = AnimationDrawObject
      .create(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip)
      .setScale(2.0);

  util.assert(animationDrawObject.getSize().equals(Vector2D.create(230,430)));
}

{ //draw()
  const util = Util.create();

  const canvasContext = {
    globalAlpha: 1.0,
    drawImage(image, x, y, width, height) {
      util.assert(image == AnimationDrawObjectTest.images[15]);
      util.assert(x == -115);
      util.assert(y == -215);
      util.assert(width == 230);
      util.assert(height == 430);
      this.drawImageCalled = true;
      return this;
    },
  };

  const animationDrawObject = AnimationDrawObject
      .create(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip)
      .setScale(2.0);
      
  animationDrawObject.draw(canvasContext);
  util.assert(canvasContext.globalAlpha == 1.0);
  util.assert(canvasContext.drawImageCalled);
}

{ //Test that the animation selector gives the animation of the plane which goes straight
  const util = Util.create();

  const animationSelector = AnimationDrawObject
      .AnimationSelector(AnimationDrawObjectTest.images, AnimationDrawObjectTest.emptyShip);

  const timeIntervalBetweenFrame =
      AnimationDrawObject.MAX_ANIMATION_DURATION_SECOND / AnimationDrawObject.ANIMATION_OFFSET_MAX
      + MathUtil.EPSILON;

  for (let nTime; nTime < 10; nTime++) {
    animationSelector.update(timeIntervalBetweenFrame);
    util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX);
  }
}

{ //Test that the animation selector gives the previous image when turning right
  const util = Util.create();

  const ship = {
    direction: 0.0,
    getDirection() {
      return this.direction;
    },
  };

  const animationSelector = AnimationDrawObject
      .AnimationSelector(AnimationDrawObjectTest.images, ship);

  const timeIntervalBetweenFrame =
      AnimationDrawObject.MAX_ANIMATION_DURATION_SECOND / AnimationDrawObject.ANIMATION_OFFSET_MAX
      + MathUtil.EPSILON;
  for (let offset = 1; offset < 15; offset++) {
    ship.direction += 0.01;
    animationSelector.update(timeIntervalBetweenFrame);
    util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX + offset);
  }
  //Check that the index does not go beyond the number of animation frame
  ship.direction += 0.01;
  animationSelector.update(timeIntervalBetweenFrame);
  util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX + 15);
}

{ //Test that the animation selector gives the previous image when turning left
  const util = Util.create();

  const ship = {
    direction: 0.0,
    getDirection() {
      return this.direction;
    },
  };

  const animationSelector = AnimationDrawObject.AnimationSelector(AnimationDrawObjectTest.images, ship);

  const timeIntervalBetweenFrame =
      AnimationDrawObject.MAX_ANIMATION_DURATION_SECOND / AnimationDrawObject.ANIMATION_OFFSET_MAX
      + MathUtil.EPSILON;
  for (let offset = 1; offset < 15; offset++) {
    ship.direction -= 0.01;
    animationSelector.update(timeIntervalBetweenFrame);
    util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX - offset);
  }
  //Check that the index does not go beyond the number of animation frame
  ship.direction -= 0.01;
  animationSelector.update(timeIntervalBetweenFrame);
  util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX - 15);
}

{ //Check that the animation selector change direction correctly
  const util = Util.create();

  const ship = {
    direction: 0.0,
    getDirection() {
      return this.direction;
    },
  };

  const animationSelector = AnimationDrawObject.AnimationSelector(AnimationDrawObjectTest.images, ship);

  const timeIntervalBetweenFrame =
      AnimationDrawObject.MAX_ANIMATION_DURATION_SECOND / AnimationDrawObject.ANIMATION_OFFSET_MAX
      + MathUtil.EPSILON;
  for (let offset = 1; offset < 15; offset++) {
    ship.direction -= 0.01;
    animationSelector.update(timeIntervalBetweenFrame);
    util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX - offset);
  }
  //Check that the index does not go beyond the number of animation frame
  ship.direction -= 0.01;
  animationSelector.update(timeIntervalBetweenFrame);
  util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX - 15);

  //Turn in the other direction
  for (let offset = 1; offset < 15; offset++) {
    ship.direction += 0.01;
    animationSelector.update(timeIntervalBetweenFrame);
    util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX - 15 + offset);
  }
  //Check that the index does not go beyond the number of animation frame
  ship.direction += 0.01;
  animationSelector.update(timeIntervalBetweenFrame);
  util.assert(animationSelector.getIndex() == AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX);
}
