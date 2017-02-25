"use strict";

const PositionableComposite = (state) => ({

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
    canvasContext.translate(state.getPosition().getX(), state.getPosition().getY());
    canvasContext.rotate(state.getDirection());
    return this;
  }

})
