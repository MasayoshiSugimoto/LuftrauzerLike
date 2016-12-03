"use strict";

const Bullet = {

	create() {
		let state = {
			position: Vector2D.zero(),
			direction: 0, //Radian
			velocity: 1.0, //meter per second
			drawObject: SHAPE_MAP.get("bullet")
		};

		return Object.assign(
			state,
			GameSpacePositionableComposite(state),
			this.template);
	},

	fromData(position, direction) {
		let bullet = this.create();
		bullet.position = position.copy();
		bullet.direction = direction;
		return bullet;
	},

	template: {

		getVelocity() {
			return this.velocity;
		},

		setVelocity(velocity) {
			return this.setVelocity;
		},

		getDrawObject() {
			return this.drawObject;
		},

		updatePosition(elapsedTimeSecond) {
			//Update the coordinates. Gravity does not apply to bullets.
			let velocityVector = Vector2D.create(1.0, 0.0).rotate(this.direction);
			this.position = this.position.add(velocityVector.scalarMultiply(elapsedTimeSecond));
		},

		draw(canvasContext) {
			this.drawObject.draw(canvasContext);
		}

	}

};
