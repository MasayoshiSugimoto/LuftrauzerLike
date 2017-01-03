"use strict";

const ANGULAR_VECTOR_EPSILON = 0.00001;

const AngularVector = {

	create(angle, y) {
		return Object.assign( {angle, y}, this.proto);
	},

	proto: {
	
		getAngle() {
			return this.angle;
		},

		getY() {
			return this.y;
		},

		add(angularVector) {
			return AngularVector.create(
				this.angle.add(angularVector.angle),
				this.y + angularVector.y);
		},

		substract(angularVector) {
			return AngularVector.create(
				this.angle.substract(angularVector.angle),
				this.y - angularVector.y);
		},

		copy() {
			return AngularVector.create(this.angle, this.y);
		},

		toString() {
			return "{angle:" + this.angle.toString() + ",y:" + this.y + "}";
		},

		equals(angularVector) {
			let dy = this.getY() - angularVector.getY(); 
			return this.getAngle().equals(angularVector.getAngle())
					&& -ANGULAR_VECTOR_EPSILON < dy && dy < ANGULAR_VECTOR_EPSILON;
		}
	}

};

