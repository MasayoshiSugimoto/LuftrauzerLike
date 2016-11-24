"use strict";

const RectangleDrawObject = {

	create() {
		let state = {
			position: Vector2D.zero(),
			direction: 0,
			size: Vector2D.zero(),


			draw(canvasContext) {
				canvasContext.fillRect(
					-this.getSize().getX()/2,
					-this.getSize().getY()/2,
					this.getSize().getX(),
					this.getSize().getY());
			}

		};

		return Object.assign(
			state,
			PositionableComposite(state),
			RectangleComposite(state)
		);
	},

	fromData(rectangle) {
		Util.create().assert(rectangle.type == "Rectangle");
		let rectangleObject = this.create();
		rectangleObject.setPosition(Vector2D.fromData(rectangle.position));
		rectangleObject.setDirection(rectangle.direction);
		rectangleObject.setSize(Vector2D.fromData(rectangle.size));
		return rectangleObject;
	}

};
