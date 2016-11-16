"use strict";

const Rectangle = {
	fromData(rectangle) {
		Util.create().assert(rectangle.type == "Rectangle");
		let rectangleObject = Object.create(this.template);
		rectangleObject.position = Vector2D.fromData(rectangle.position);
		rectangleObject.size = Vector2D.fromData(rectangle.size);
		rectangleObject.direction = rectangle.direction;
		return rectangleObject;
	},

	create() {
		return Object.create(this.template);
	},

	template: {
		position:		Vector2D.zero(),
		size:       Vector2D.zero(),
		direction:  0,

		getPosition() {
			return this.position;
		},

		getSize() {
			return this.size;
		},

		getDirection() {
			return this.direction;
		},

		getGeometryType() {
			return "Rectangle";
		}

	}
};
