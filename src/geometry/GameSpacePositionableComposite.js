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

})
