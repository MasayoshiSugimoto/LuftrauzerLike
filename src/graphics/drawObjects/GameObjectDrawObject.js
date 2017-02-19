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
    draw(canvasContext, elapsedTimeSecond) {
      if (this.gameObject.isDead() && this.gameObject == this.activeGameObject) {
        this.activeDrawObject = this.factory.getExplosionDrawObjectFactory().create();
        this.activeGameObject = this.factory.getEmptyGameObjectFactory()
            .create(this.gameObject.getPosition(), this.gameObject.getDirection());
      }
      this.activeDrawObject.draw(canvasContext, elapsedTimeSecond);
      return this;
    },
  },
};

const GameObjectDrawObjectFactory = (explosionDrawObjectFactory, emptyGameObjectFactory) => {
  return {
    explosionDrawObjectFactory: explosionDrawObjectFactory,
    emptyGameObjectFactory: emptyGameObjectFactory,

    create(drawObject, gameObject) {
      return GameObjectDrawObject.create(drawObject, gameObject, this);
    },
    getExplosionDrawObjectFactory() {
      return this.explosionDrawObjectFactory;
    },
    getEmptyGameObjectFactory() {
      return this.emptyGameObjectFactory;
    }
  };
};
