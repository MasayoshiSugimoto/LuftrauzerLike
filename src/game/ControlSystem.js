"use strict";

function ControlSystem() {}

ControlSystem.createKeyboardData = function() {
  return {
    boost: false,
    left: false,
    right: false,
    fire: false
  }
}

ControlSystem.setupKeyboardHandlers = function(inputData) {
  window.onkeydown = event => {
    switch (event.which) {
      case KEYBOARD_KEY_E:
        inputData.boost = true
        break
      case KEYBOARD_KEY_A:
        inputData.left = true
        break
      case KEYBOARD_KEY_D:
        inputData.right = true
        break
      case KEYBOARD_KEY_SPACE:
        inputData.fire = true
        break
    }
  }

  window.onkeyup = event => {
    switch (event.which) {
      case KEYBOARD_KEY_E:
        inputData.boost = false
        break
      case KEYBOARD_KEY_A:
        inputData.left = false
        break
      case KEYBOARD_KEY_D:
        inputData.right = false
        break
      case KEYBOARD_KEY_SPACE:
        inputData.fire = false
        break
    }
  }
}
