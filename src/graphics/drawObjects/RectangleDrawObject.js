"use strict";

const RectangleDrawObject = {
	create(rectangle) {
		let rectangleDrawObject = Object.create(this.template);
		rectangleDrawObject.rectangle = rectangle;
		return rectangleDrawObject;
	},

	template: {
		rectangle: Rectangle.create(),

		getPosition() {
			return this.rectangle.getPosition();
		},

		getSize() {
			return this.rectangle.getSize();
		},

		getDirection() {
			return this.rectangle.getDirection();
		},

		getChildren() {
			return [];
		},

		getGeometryType() {
			return this.rectangle.getGeometryType();
		},

		draw(canvasContext) {
			canvasContext.translate(
				this.rectangle.getPosition().getX(),
				this.rectangle.getPosition().getY());
			canvasContext.rotate(this.rectangle.getDirection())
			canvasContext.fillRect(
				-this.rectangle.getSize().getX()/2,
				-this.rectangle.getSize().getY()/2,
				this.rectangle.getSize().getX(),
				this.rectangle.getSize().getY());
		}

	}
};
