"use strict";

/*
 * This class represent an angle between -PI and PI.
 */
const Angle = {

	create(angleInRadian) {

		let angleObject = Object.assign(
			{
				angleInRadian: angleInRadian
			},
			{

				//Convert the angle set to fit within -PI and PI.
				set(angleInRadian) {

					let divisor = 0;
					//Round to zero
					if (angleInRadian > 0.0) {
						divisor = Math.floor(angleInRadian / Math.PI);
					} else {
						divisor = Math.ceil(angleInRadian / Math.PI);
					}

					//Remove modulo
					angleInRadian = angleInRadian - divisor * Math.PI;

					//Correct side if non 2PI factor
					if (divisor % 2 != 0) {
						angleInRadian = -angleInRadian;
					}

					//Set the value
					this.angleInRadian = angleInRadian;

					return this;
				},

				get() {
					return this.angleInRadian;
				},

				minus() {
					this.angleInRadian = -this.angleInRadian;
					return this;
				}

			}
		);

		return angleObject.set(angleInRadian);

	},

};

