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
		canvasContext.translate(state.getPosition().getX(), state.getPosition().getY());
		canvasContext.rotate(state.getDirection());
	}

})
