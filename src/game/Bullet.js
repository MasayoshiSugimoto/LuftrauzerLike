"use strict";

const Bullet = {

  create: function(position, direction) {
    let state = {
      className  :  "bullet",
    }

    const bullet = Object.assign(
      state,
			PhysicalComponent.prototype,
      this.proto,
      Disposable(state)
		)

		bullet.position = position,
		bullet.direction = direction
		bullet.velocity = 6.0 // Metter per second

		return bullet
  },

  proto: {

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

    getRadius() {
      return 0.3;
    },
  }

};
