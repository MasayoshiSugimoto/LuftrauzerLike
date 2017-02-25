"use strict";

{ //Test create
  let util = Util.create();

  let expectedCloud = {
    setPositionCounter: 0,
    setPosition(position) {
      util.assert(position.getX() > -15 * PIXEL_PER_METER);
      util.assert(position.getX() < 15 * PIXEL_PER_METER);
      util.assert(position.getY() > -15 * PIXEL_PER_METER);
      util.assert(position.getY() < 15 * PIXEL_PER_METER);
      this.setPositionCounter++;
      return this;
    }
  };
  let drawObjectManager = {
    counter: 0,
    add(cloud) {
      util.assert(cloud == expectedCloud);
      this.counter++;
    }
  };
  let expectedImages = {};
  let expectedImageDrawObjectFactory = {};
  let cloudFactory = {
    createCounter: 0,
    create(images, imageDrawObjectFactory) {
      util.assert(images == expectedImages);
      util.assert(imageDrawObjectFactory == expectedImageDrawObjectFactory);
      this.createCounter++;
      return expectedCloud;
    },
  };

  let cloudGenerator = CloudGenerator.create(
    drawObjectManager,
    expectedImages,
    cloudFactory,
    expectedImageDrawObjectFactory);

  util.assert(drawObjectManager.counter == 100);
  util.assert(cloudFactory.createCounter == 100);
  util.assert(expectedCloud.setPositionCounter == 100);
}

