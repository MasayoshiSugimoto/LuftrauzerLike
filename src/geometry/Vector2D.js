"use strict";

const Vector2D = {

	create(x, y) {
		return Object.assign( {x: x, y: y}, this.proto );
	},

	fromData(vector2DData) {
		return this.create(vector2DData.x, vector2DData.y);
	},

	zero() {
		return this.create(0,0);
	},

	unitX() {
		return this.create(1.0, 0.0);
	},

	unitY() {
		return this.create(0.0, 1.0);
	},

	distanceBetween(v1, v2) {
		return v1.substract(v2).distance();
	},

	proto: {

		getX() {
			return this.x;
		},

		getY() {
			return this.y;
		},

		add(vector2D) {
			return Vector2D.create(vector2D.x + this.x, vector2D.y + this.y);
		},

		substract(vector2D) {
			return Vector2D.create(this.x - vector2D.x, this.y - vector2D.y);
		},

		scalarMultiply(scalar) {
			return Vector2D.create(this.x * scalar, this.y * scalar);
		},

		copy() {
			return Vector2D.create(this.x, this.y);
		},

		resize(size) {
			return this.scalarMultiply(size / this.distance());
		},

		normalize() {
			return this.resize(1.0);
		},

		distance() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},

		cut(size) {
			if (this.distance() > size) {
				return this.resize(size);
			}
			return this.copy();
		},

		rotate(angle) {
			return Vector2D.create(
				Math.cos(angle) - this.y * Math.sin(angle),
				Math.sin(angle) + this.y * Math.cos(angle)
			);
		},

		dot(vector2D) {
			return this.x * Vector2D.x + this.y * Vector2D.y;
		},

		toString() {
			return "{x:" + this.x + ",y:" + this.y + "}";
		},

		getAngle() {
			return Angle.create(Math.atan2(this.y, this.x));
		}

	}
};
