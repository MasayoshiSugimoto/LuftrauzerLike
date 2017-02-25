"use strict";

const GameKeyboardHandler = {

  setup(initializer) {

    //Set the handles when a key is pressed
    window.onkeydown = function(event) {
      switch (event.which) {
        case KEYBOARD_KEY_E:
          initializer.getShip().isBoost = true;
          break;
        case KEYBOARD_KEY_A:
          initializer.getShip().isLeft = true;
          break;
        case KEYBOARD_KEY_D:
          initializer.getShip().isRight = true;
          break;
        case KEYBOARD_KEY_SPACE:
          initializer.getMachineGun().onFireStart();
          break;
      }
    }

    //Set key up handler
    window.onkeyup = function(event) {
      switch (event.which) {
        case KEYBOARD_KEY_E:
          initializer.getShip().isBoost = false;
          break;
        case KEYBOARD_KEY_A:
          initializer.getShip().isLeft = false;
          break;
        case KEYBOARD_KEY_D:
          initializer.getShip().isRight = false;
          break;
        case KEYBOARD_KEY_SPACE:
          initializer.getMachineGun().onFireStop();
          break;
      }
    }

  }

};
