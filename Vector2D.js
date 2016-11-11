"use strict";

const Vector2D = {
	create(x,y) {
		let v = Object.create(this.template);
		v.x = x;
		v.y = y;
		return v;
	},
	fromData(vector2DData) {
		let v = Object.create(this.template);
		v.x = vector2DData.x;
		v.y = vector2DData.y;
		return v;
	},

	zero() {
		return this.create(0,0);
	},

	template: {
		x: 0,
		y: 0,

		getX() {
			return this.x;
		},

		getY() {
			return this.y;
		},

		add(vector2D) {
			let result = Vector2D.zero();
			result.x = vector2D.x + this.x;
			result.y = vector2D.y + this.y;
			return result;
		},

		scalarMultiply(scalar) {
			let result = Vector2D.zero();
			result.x = this.x * scalar;
			result.y = this.y * scalar;
			return result;
		},

		copy() {
			return Vector2D.create(this.x, this.y);
		},

		resize(size) {
			return this.scalarMultiply(size / this.distance());
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

		toString() {
			return "{x:" + this.x + ",y:" + this.y + "}";
		}

	}
};
