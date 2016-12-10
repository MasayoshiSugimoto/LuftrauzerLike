"use strict";

const KEYBOARD_KEY_E      = 87;
const KEYBOARD_KEY_A      = 65;
const KEYBOARD_KEY_D      = 68;
const KEYBOARD_KEY_SPACE  = 32;

const Keyboard = {

	setup(gameContext) {

		//Set the handles when a key is pressed
		window.onkeydown = function(event) {
			switch (event.which) {
				case KEYBOARD_KEY_E:
					gameContext.ship.isBoost = true;
					break;
				case KEYBOARD_KEY_A:
					gameContext.ship.isLeft = true;
					break;
				case KEYBOARD_KEY_D:
					gameContext.ship.isRight = true;
					break;
				case KEYBOARD_KEY_SPACE:
					gameContext.getMachineGun().onFireStart();
					break;
			}
		}

		//Set key up handler
		window.onkeyup = function(event) {
			switch (event.which) {
				case KEYBOARD_KEY_E:
					gameContext.ship.isBoost = false;
					break;
				case KEYBOARD_KEY_A:
					gameContext.ship.isLeft = false;
					break;
				case KEYBOARD_KEY_D:
					gameContext.ship.isRight = false;
					break;
				case KEYBOARD_KEY_SPACE:
					gameContext.getMachineGun().onFireStop();
					break;
			}
		}

	}

};
