"use strict";

function PhysicalComponent() {}

PhysicalComponent.prototype = {
	position: Vector2D.zero(),
	direction: 0.0, // Radian
	velocity: 0.0,

	getDirection() {
		return this.direction;
	},

	setDirection(direction) {
		this.direction = direction;
		return this;
	},
}
