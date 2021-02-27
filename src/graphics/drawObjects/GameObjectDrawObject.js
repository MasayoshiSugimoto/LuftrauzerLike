"use strict";

/**
 * Simple draw object which associates a gameObject and a draw object.
 */
const GameObjectDrawObject = {
  create(drawObject, gameObject, factory) {

    const gameObjectDrawObject = Object.assign(
      {
        className         :  "GameObjectDrawObject",
        drawObject        :  drawObject,
        gameObject        :  gameObject,
        factory           :  factory,
        activeDrawObject  :  drawObject,
        activeGameObject  :  gameObject,
      },
      this.proto
    );
    gameObjectDrawObject.setActiveGameObject(gameObject);
    return gameObjectDrawObject;

  },

  proto: {
    getGameObject() {
      return this.activeGameObject;
    },
    getDrawObject() {
      return this.activeDrawObject;
    },
    getPosition() {
      return this.activeGameObject.position;
    },
    setPosition(position) {
      this.activeGameObject.position = position
      return this
    },
    getScreenPosition() {
      return this.activeGameObject.position.scalarMultiply(PIXEL_PER_METER);
    },
    setScreenPosition(position) {
      this.activeGameObject.position = position.scalarMultiply(1.0 / PIXEL_PER_METER)
      return this;
    },
    getDirection() {
      return this.activeGameObject.getDirection();
    },
    setDirection(direction) {
      this.activeGameObject.setDirection(direction);
      return this;
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
    update(elapsedTimeSecond) {
      this.activeGameObject.update(elapsedTimeSecond);
      this.activeDrawObject.update(elapsedTimeSecond);
      return this;
    },
    draw(canvasContext, elapsedTimeSecond) {
      if (this.gameObject.isDead() && this.gameObject == this.activeGameObject) {
        this.activeDrawObject = this.factory.getExplosionDrawObjectFactory().create();
        this.setActiveGameObject(this.factory.getEmptyGameObjectFactory()
            .create(this.gameObject.getPosition(), this.gameObject.getDirection()));
      }
      this.activeDrawObject.draw(canvasContext, elapsedTimeSecond);
      return this;
    },
    toDelete() {
      return this.gameObject.isDead() && this.activeDrawObject.toDelete();
    },
    getRadius() {
      return this.activeGameObject.getRadius();
    },
    setActiveGameObject(gameObject) {
      this.activeGameObject = gameObject;
      if (null == gameObject.collide) {
        this.collide = null;
      } else {
        this.collide = () => {
          this.activeGameObject.collide();
          return this;
        }
      }
      return this;
    },
  },
};

function GameObjectDrawObjectFactory(explosionDrawObjectFactory, emptyGameObjectFactory) {
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
