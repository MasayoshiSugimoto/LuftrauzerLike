"use strict";

const CLOUD_GENERATOR_SIZE_METER = 30.0;
const CLOUD_SIZE_MIN_SCALE = 1.0;
const CLOUD_SIZE_MAX_SCALE = 2.0;

const CloudGenerator = {

  create(drawObjectManager, images) {

    let randomCoordinate = function() {
      return (Math.random() * CLOUD_GENERATOR_SIZE_METER) - (CLOUD_GENERATOR_SIZE_METER / 2.0);
    };

    let randomScale = function() {
      return Math.random() * (CLOUD_SIZE_MAX_SCALE - CLOUD_SIZE_MIN_SCALE) + CLOUD_SIZE_MIN_SCALE;
    };

    for (let index = 0; index < 100; index++) {

      let cloud = {
        position: Vector2D.create(randomCoordinate(), randomCoordinate()),
        direction: 0,
        drawObject: ImageDrawObject.create(images.get('images/Cloud.png'))
          .setScale(randomScale())
          .setOpacity(0.5),

        draw(canvasContext) {
          this.drawObject.draw(canvasContext);
        }
      };
        
      drawObjectManager.add(Object.assign(cloud, GameSpacePositionableComposite(cloud)));

    }

  }

};