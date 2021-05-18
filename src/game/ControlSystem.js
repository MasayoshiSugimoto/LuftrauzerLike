"use strict"

function ControlSystem(physicsSystem) {
	this.seaController = new SeaController(physicsSystem)
}

ControlSystem.prototype.getInputData = function() {
	if (this.seaController.isInSea()) return this.seaController.inputData
	return KeyboardControl.inputData
}

ControlSystem.prototype.update = function(entityId, elapsedTimeSecond) {
	this.seaController.update(entityId, elapsedTimeSecond)
}

function KeyboardControl() {}

KeyboardControl.inputData = {
	left: false,
	right: false,
	boost: false,
	fire: false
}

KeyboardControl.setupKeyboardHandlers = function() {
	const inputData = KeyboardControl.inputData
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

function SeaController(physicsSystem) {
	this.physicsSystem = physicsSystem
	this.inputData = {
    boost: true,
    left: false,
    right: false,
    fire: false
  }
}

SeaController.prototype.update = function(entityId, elapsedTimeSecond) {
	const component = this.physicsSystem.getComponent(entityId)
	if (component.position.y <= Sea.Y_COORDINATE_METER) {
		const baseAngle = Angle.normalize(component.direction+Math.PI/2)
		if (baseAngle >= 0) {
			this.inputData.left = true
			this.inputData.right = false
		} else {
			this.inputData.left = false
			this.inputData.right = true
		}
	} else {
		this.inputData.left = false
		this.inputData.right = false
	}
}

SeaController.prototype.isInSea = function() {
	return this.inputData.left || this.inputData.right
}
