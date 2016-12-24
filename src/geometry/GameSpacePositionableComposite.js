"use strict";

const GameSpacePositionableComposite = (state) => ({

	getPosition() {
		return state.position;
	},

	setPosition(position) {
		state.position = position;
		return this;
	},

	getDirection() {
		return state.direction;
	},

	setDirection(direction) {
		state.direction = direction;
		return this;
	},

	placeOn(canvasContext) {
		let screenPosition = state.getPosition().scalarMultiply(PIXEL_PER_METER);
		canvasContext.translate(screenPosition.getX(), screenPosition.getY());
		canvasContext.rotate(state.getDirection());
		return this;
	}

})
