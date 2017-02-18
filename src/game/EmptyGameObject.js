"use strict";

const EmptyGameObject = {

  create(position, direction) {
    return Object.assign({
        position: position,
        direction: direction
      }, this.proto);
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
    }
  }

};
