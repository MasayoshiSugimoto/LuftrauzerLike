"use strict";

const PositionableComposite = (state) => ({

	getPosition() {
		return state.position;
	},

	setPosition(position) {
		state.position = position;
	},

	getDirection() {
		return state.direction;
	},

	setDirection(direction) {
		state.direction = direction;
	},

	placeOn(canvasContext) {
		canvasContext.translate(state.position.getX(), state.position.getY());
		canvasContext.rotate(state.direction);
	}

})
