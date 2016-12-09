"use strict";

const VELOCITY_MAX				= 4; //Velocity in meter/second
const SHIP_ROTATION_UNIT	= Math.PI * 2; //Rotation allowed per frame
const SHIP_BOOST_UNIT			= 0.1; //Velocity in meter/second

const Ship = {

	create(drawObject) {
		let ship        =  Object.create(this.template);
		ship.isBoost    =  false;
		ship.isLeft     =  false;
		ship.isRight    =  false;
		ship.position		=  Vector2D.create(0,0); //Game coordinates in meter
		ship.velocity   =  Vector2D.create(0,0); //Velocity in meter/second
		ship.drawObject =  drawObject;
		return ship;
	},

	template: {

		getPosition() {
			return this.position;
		},

		setPosition(position) {
			this.position = position;
		},

		getVelocity() {
			return this.velocity;
		},

		getDirection() {
			return this.drawObject.getDirection();
		},

		setDirection(direction) {
			this.drawObject.setDirection(direction);
		},

		updatePosition(elapsedTime /*frame duration in second*/) {
			//Update velocity
			this.velocity = (GRAVITY_VECTOR.scalarMultiply(elapsedTime))
				.add(this.velocity)
				.cut(VELOCITY_MAX);
			//Update position
			this.setPosition(this.getPosition()
				.add(this.velocity.scalarMultiply(elapsedTime)));
		},

		updateControl(elapsedTime /*frame duration in second*/) {

			//Update direction
			if (this.isLeft) {
				this.setDirection(
					this.getDirection() - (SHIP_ROTATION_UNIT * elapsedTime));
			} else if (this.isRight) {
				this.setDirection(
					this.getDirection() + (SHIP_ROTATION_UNIT * elapsedTime));
			}

			//Update boost
			if (this.isBoost) {
				let boost = SHIP_BOOST_UNIT * elapsedTime;
				this.velocity = this.velocity
					.add(Vector2D.create(boost,0).rotate(this.getDirection()));
			}

		},

		draw(canvasContext) {
			this.drawObject.setPosition(this.getPosition().scalarMultiply(PIXEL_PER_METER));
			this.drawObject.draw(canvasContext);
		}

	}

};

