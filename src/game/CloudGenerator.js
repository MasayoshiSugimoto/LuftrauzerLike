"use strict";

const CLOUD_GENERATOR_SIZE_METER = 30.0;

const CloudGenerator = {

  create(drawObjectManager, images, cloudFactory, imageDrawObjectFactory) {

    let randomCoordinate = function() {
      return (Math.random() * CLOUD_GENERATOR_SIZE_METER) - (CLOUD_GENERATOR_SIZE_METER / 2.0);
    };

    for (let index = 0; index < 100; index++) {
			drawObjectManager.add(
				cloudFactory.create(images, imageDrawObjectFactory)
					.setPosition(Vector2D.create(randomCoordinate(), randomCoordinate())));
    }

  }

};
