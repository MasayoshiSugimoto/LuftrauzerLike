"use strict";

/**
 * Simple draw object which associates a gameObject and a draw object.
 */
const GameObjectDrawObject = {
  create(drawObject, gameObject, factory) {
    return Object.assign(
      {
        drawObject        :  drawObject,
        gameObject        :  gameObject,
        factory           :  factory,
        activeDrawObject  :  drawObject,
        activeGameObject  :  gameObject,
      },
      this.proto
    );
  },
  
  proto: {
    getGameObject() {
      return this.activeGameObject;
    },
    getPosition() {
		  return this.activeGameObject.getPosition().scalarMultiply(PIXEL_PER_METER);
    },
    setPosition(position) {
      this.activeGameObject.setPosition(position.scalarMultiply(1.0 / PIXEL_PER_METER));
      return this;
    },
    getDirection() {
      return this.activeGameObject.getDirection();
    },
    setDirection(direction) {
      return this.activeGameObject.setDirection(direction);
    },
    setScale(scale) {
      this.activeDrawObject.setScale(scale);
      return this;
    },
    getSize() {
      return this.activeDrawObject.getSize();
    },
    setOpacity(opacity) {
      this.activeDrawObject.setOpacity(opacity);
      return this;
    },
    placeOn(canvasContext) {
      this.activeGameObject.placeOn(canvasContext);
      return this;
    },
    draw(canvasContext) {
      this.activeDrawObject.draw(canvasContext);
      return this;
    },
    update(elapsedTime) {
      if (this.gameObject.isDead()) {
        this.activeDrawObject = this.factory.getExplosionDrawObject();
        this.activeGameObject = this.factory.getEmptyGameObject();
      }
      this.activeGameObject.update(elapsedTime);
    },
  },
};

const GameObjectDrawObjectFactory = (explosionDrawObject, emptyGameObject) => {
  return {
    explosionDrawObject: explosionDrawObject,
    emptyGameObject: emptyGameObject,

    create(drawObject, gameObject) {
      return GameObjectDrawObject.create(drawObject, gameObject, this);
    },
    getExplosionDrawObject() {
      return this.explosionDrawObject;
    },
    getEmptyGameObject() {
      return this.emptyGameObject;
    },
  };
};
