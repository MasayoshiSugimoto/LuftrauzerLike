"use strict";

const ShipKeyboardControllerTest = () => {
  return {
    isBoost() { return false; },
    isLeft() { return false; },
    isRight() { return false; }, 
    setOnFireStartCallback(onFireStartCallback) {
      this.onFireStartCallback = onFireStartCallback;
    },
    setOnFireStopCallback(onFireStopCallback) {
      this.onFireStopCallback = onFireStopCallback;
    },
  };
};
