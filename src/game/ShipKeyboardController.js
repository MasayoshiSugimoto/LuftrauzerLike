"use strict";

function ShipKeyboardController(windowObject) {

  const shipController = {
    boost:  false,
    left:   false,
    right:  false,
    onFireStartCallback: () => { },
    onFireStopCallback: () => { },

    isBoost() {
      return this.boost;
    },

    isLeft() {
      return this.left;
    },

    isRight() {
      return this.right;
    },

    setOnFireStartCallback(onFireStartCallback) {
      this.onFireStartCallback = onFireStartCallback;
    },

    setOnFireStopCallback(onFireStopCallback) {
      this.onFireStopCallback = onFireStopCallback;
    },
  };

  //Set the handles when a key is pressed
  windowObject.onkeydown = function(event) {
    switch (event.which) {
      case KEYBOARD_KEY_E:
        shipController.boost = true;
        break;
      case KEYBOARD_KEY_A:
        shipController.left = true;
        break;
      case KEYBOARD_KEY_D:
        shipController.right = true;
        break;
      case KEYBOARD_KEY_SPACE:
        shipController.onFireStartCallback();
        break;
    }
  }

  //Set key up handler
  windowObject.onkeyup = function(event) {
    switch (event.which) {
      case KEYBOARD_KEY_E:
        shipController.boost = false;
        break;
      case KEYBOARD_KEY_A:
        shipController.left = false;
        break;
      case KEYBOARD_KEY_D:
        shipController.right = false;
        break;
      case KEYBOARD_KEY_SPACE:
        shipController.onFireStopCallback();
        break;
    }
  }

  return shipController;

};
