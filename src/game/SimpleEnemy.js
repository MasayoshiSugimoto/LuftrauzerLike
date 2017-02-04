"use strict";

const SIMPLE_ENEMY_MAX_ROTATION_SPEED_RADIAN_SECOND = Math.PI; //Radian per second
const SIMPLE_ENEMY_VELOCITY_METER_SECOND = 1.0; //Meter per second
const SIMPLE_ENEMY_FIRE_RATE = 10; //Bullets per second

const SimpleEnemy = {

	create(target, machineGun) {

		let enemy = {
			position: Vector2D.zero(),
			direction: 0, //Radian
			target: target,
			machineGun: machineGun
		};

		let proto = {

			newDirection(elapsedTime) {
				let me2Target = target.getPosition().substract(this.getPosition());

				//Check if the distance is close to zero. In that case, no rotation.
				if (Math.abs(me2Target.distance()) <= EPSILON) {
					return this.getDirection();
				}

				//Rotate in the direction of the target
				let deltaDirection =
					me2Target.getAngle().substract(Angle.create(this.getDirection())).get();

				//Within the max rotation
				let maxRotation = SIMPLE_ENEMY_MAX_ROTATION_SPEED_RADIAN_SECOND * elapsedTime;
				deltaDirection = Math.min(maxRotation, Math.max(deltaDirection, -maxRotation));

				//Convert to angle
				return Angle.create(this.getDirection() + deltaDirection).get();
			},

			newPosition(elapsedTime, newDirection) {
				return this.getPosition().add(
					Vector2D.unitX().rotate(newDirection) //Apply rotation
						//Apply velocity
						.scalarMultiply(SIMPLE_ENEMY_VELOCITY_METER_SECOND * elapsedTime));
			},

			update(elapsedTime) {

				//Follow the target (Update rotation first)
				let newDirection = this.newDirection(elapsedTime);
				this.setDirection(newDirection);

				//Follow the target (Update position)
				this.setPosition(this.newPosition(elapsedTime, newDirection));

				//Fire
			},

		};

		return Object.assign(enemy, proto, GameSpacePositionableComposite(enemy));

	},

};
