"use strict";

const Bullet = {

	create() {
		let state = {
      position    :  Vector2D.zero(),
      direction   :  0,    //Radian
      velocity    :  5.0,  //meter  per  second
		};

		return Object.assign(
			state,
			GameSpacePositionableComposite(state),
			this.proto);
	},

	fromData(position, direction) {
		let bullet = this.create();
		bullet.position = position.copy();
		bullet.direction = direction;
		return bullet;
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
			this.position = this.position.add(velocityVector.scalarMultiply(
				elapsedTimeSecond * this.velocity));
		},

    update(elapsedTimeSecond) {
    },

    collide() {
    },

    isDead() {
      return false;
    }

	}

};
