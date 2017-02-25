"use strict";

const CLOUD_SIZE_MIN_SCALE = 1.0;
const CLOUD_SIZE_MAX_SCALE = 2.0;

const Cloud = {

  create(images, ImageDrawObjectFactory) {

    let randomScale = function() {
      return Math.random() * (CLOUD_SIZE_MAX_SCALE - CLOUD_SIZE_MIN_SCALE) + CLOUD_SIZE_MIN_SCALE;
    };

    let cloud = {
      position: Vector2D.zero(),
      direction: 0.0,
      drawObject: ImageDrawObjectFactory.create(images.get('images/Cloud.png'))
        .setScale(randomScale())
        .setOpacity(0.5),

      draw(canvasContext) {
        this.drawObject.draw(canvasContext);
      },
      toDelete() {
        return false;
      }
    };

    return Object.assign(cloud, GameSpacePositionableComposite(cloud));
  }

};

