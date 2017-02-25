"use strict";

{ //Test create
  let util = Util.create();

  let expectedCanvasContext = {};

  let images = new Map();
  let expectedImageObject = {
    setScale(scale) {
      util.assert(scale < CLOUD_SIZE_MAX_SCALE);
      util.assert(scale > CLOUD_SIZE_MIN_SCALE);
      return this;
    },
    setOpacity(opacity) {
      util.assert(opacity == 0.5);
      return this;
    },
    draw(canvasContext) {
      util.assert(canvasContext == expectedCanvasContext);
      return this;
    }
  };
  images.set('images/Cloud.png', expectedImageObject);

  let imageDrawObjectFactory = {
    create(image) {
      util.assert(expectedImageObject == image);
      return expectedImageObject;
    }
  };

  for (let index = 0; index < 1000; index++) {
    Cloud.create(images, imageDrawObjectFactory).draw(expectedCanvasContext);
  }

}
