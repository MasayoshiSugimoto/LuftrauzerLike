"use strict";

const CLOUD_GENERATOR_SIZE_PIXEL = 30.0 * PIXEL_PER_METER;

const CloudGenerator = {

  create(drawObjectManager, images, cloudFactory, imageDrawObjectFactory) {

    let randomCoordinate = function() {
      return (Math.random() * CLOUD_GENERATOR_SIZE_PIXEL) - (CLOUD_GENERATOR_SIZE_PIXEL / 2.0);
    };

    for (let index = 0; index < 100; index++) {
			drawObjectManager.add(
				cloudFactory.create(images, imageDrawObjectFactory)
					.setPosition(Vector2D.create(randomCoordinate(), randomCoordinate())));
    }

  }

};
