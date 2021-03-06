"use strict";

const EmptyGameObject = {

  create(position, direction) {
    let emptyGameObject = {
      position: position,
      direction: direction,
    };
    return Object.assign(emptyGameObject, this.proto, Disposable(emptyGameObject));
  },
  proto: {
    update() {
      return this;
    },
    collide() {
      return this;
    },
    isDead() {
      return false;
    },
    getPosition() {
      return this.position;
    },
    getDirection() {
      return this.direction;
    },
    setPosition(position) {
      this.position = position;
      return this;
    },
    setDirection(direction) {
      this.direction = direction;
      return this;
    },
    getRadius() {
      return 0.0;
    },
  }

};
