"use strict";

const Bullet = {

  create(position, direction) {
    let state = {
      className  :  "bullet",
      position   :  position,
      direction  :  direction,  //Radian
      velocity   :  6.0,        //meter   per  second
    };

    return Object.assign(
      state,
      GameSpacePositionableComposite(state),
      this.proto,
      Disposable(state));
  },

  proto: {

    getVelocity() {
      return this.velocity;
    },

    setVelocity(velocity) {
      return this.setVelocity;
    },

    updatePosition(elapsedTimeSecond) {
      //Update the coordinates. Gravity does not apply to bullets.
      let velocityVector = Vector2D.create(1.0, 0.0).rotate(this.direction);
      this.position = this.position
          .add(velocityVector.scalarMultiply(elapsedTimeSecond * this.velocity));
      return this;
    },

    update(elapsedTimeSecond) {
      this.updatePosition(elapsedTimeSecond);
      return this;
    },

    collide() {
      return this;
    },

    isDead() {
      return false;
    },

  }

};
