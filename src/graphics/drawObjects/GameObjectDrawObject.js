"use strict";

/**
 * Simple draw object which associates a gameObject and a draw object.
 */
const GameObjectDrawObject = {
  create(drawObjectIn, gameObjectIn) {
    return Object.assign(
      {
        drawObject  : drawObjectIn,
        gameObject  : gameObjectIn,
      },
      this.proto
    );
  },
  
  proto: {
    getPosition() {
		  return this.gameObject.getPosition().scalarMultiply(PIXEL_PER_METER);
    },
    setPosition(position) {
      this.gameObject.setPosition(position.scalarMultiply(1.0 / PIXEL_PER_METER));
      return this;
    },
    setScale(scale) {
      this.drawObject.setScale(scale);
      return this;
    },
    getSize() {
      return this.drawObject.getSize();
    },
    setOpacity(opacity) {
      this.drawObject.setOpacity(opacity);
      return this;
    },
    placeOn(canvasContext) {
      this.gameObject.placeOn(canvasContext);
      return this;
    },
    draw(canvasContext) {
      this.drawObject.draw(canvasContext);
      return this;
    },
  },
};

