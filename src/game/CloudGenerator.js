"use strict";

const CLOUD_GENERATOR_SIZE_METER = 100.0;
const CLOUD_SIZE_MIN_METER = 0.5;
const CLOUD_SIZE_MAX_METER = 1.5;

const CloudGenerator = {

  create(drawObjectManager) {

    let randomCoordinate = function() {
      return (Math.random() * CLOUD_GENERATOR_SIZE_METER) - (CLOUD_GENERATOR_SIZE_METER / 2.0);
    };

    let randomSize = function() {
      return ScreenConversion.meter2Pixel(
        Math.random() * (CLOUD_SIZE_MAX_METER - CLOUD_SIZE_MIN_METER));
    };

    for (let index = 0; index < 100; index++) {

      let cloud = {
        position: Vector2D.create(randomCoordinate(), randomCoordinate()),
        direction: 0,
        drawObject: RectangleDrawObject.create()
          .setSize(Vector2D.create(randomSize(), randomSize())),

        draw(canvasContext) {
          this.drawObject.draw(canvasContext);
        }
      };
        
      drawObjectManager.add(Object.assign(cloud, GameSpacePositionableComposite(cloud)));

    }

  }

};