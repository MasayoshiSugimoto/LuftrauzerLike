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
      if (this.gameObject.isDead() && this.activeDrawObject != this.factory.getExplosionDrawObject()) {
        this.activeDrawObject = this.factory.getExplosionDrawObject();
        this.activeGameObject = this.getEmptyGameObjectFactory()
            .create(this.gameObject.getPosition(), this.gameObject.getDirection());
      }
      this.activeDrawObject.draw(canvasContext);
      return this;
    },
  },
};

const GameObjectDrawObjectFactory = (explosionDrawObject, emptyGameObjectFactory) => {
  return {
    explosionDrawObject: explosionDrawObject,
    emptyGameObjectFactory: emptyGameObjectFactory,

    create(drawObject, gameObject) {
      return GameObjectDrawObject.create(drawObject, gameObject, this);
    },
    getExplosionDrawObject() {
      return this.explosionDrawObject;
    },
    getEmptyGameObjectFactory() {
      return this.emptyGameObjectFactory;
    }
  };
};
