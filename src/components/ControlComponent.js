"use strict"

/*******************************************************************************
 * ControlComponent
 *
 * This class manages user inputs. It also takes control of the player if he
 * goes in the sea on in the sky.
 ******************************************************************************/

function ControlComponent(physicsSystem, entityId) {
	this.seaController = new SeaController(physicsSystem, entityId)
	this.skyController = new SkyController(physicsSystem, entityId)
}

ControlComponent.prototype.getInputData = function() {
	if (this.seaController.isInSea()) return this.seaController.inputData
	if (this.skyController.isInSky()) return this.skyController.inputData
	return KeyboardControl.inputData
}

ControlComponent.prototype.update = function(entityId, elapsedTimeSecond) {
	this.seaController.update(elapsedTimeSecond)
	this.skyController.update(elapsedTimeSecond)
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

function SeaController(physicsSystem, entityId) {
	this.physicsSystem = physicsSystem
	this.entityId = entityId
	this.inputData = {
    boost: true,
    left: false,
    right: false,
    fire: false
  }
}

SeaController.prototype.update = function(elapsedTimeSecond) {
	const component = this.physicsSystem.getComponent(this.entityId)
	const baseAngle = Angle.normalize(component.direction-Math.PI/2)
	if (this.isInSea()) {
		if (Math.abs(baseAngle) >= 3 * (Math.PI / 4)) {
			this.inputData.left = false
			this.inputData.right = false
		} else if (baseAngle <= 0) {
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
	const component = this.physicsSystem.getComponent(this.entityId)
	return component.position.y <= SEA_Y_COORDINATE_METER
}

function SkyController(physicsSystem, entityId) {
	this.physicsSystem = physicsSystem
	this.entityId = entityId
	this.inputData = {
		boost: true,
		left: false,
		right: false,
		fire: false
	}
}

SkyController.prototype.update = function(elapsedTimeSecond) {
	const component = this.physicsSystem.getComponent(this.entityId)
	const baseAngle = Angle.normalize(component.direction+Math.PI/2)
	if (this.isInSky()) {
		if (Math.abs(baseAngle) >= 3 * (Math.PI / 4)) {
			this.inputData.left = false
			this.inputData.right = false
		} else if (baseAngle <= 0) {
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

SkyController.prototype.isInSky = function() {
	const component = this.physicsSystem.getComponent(this.entityId)
	return component.position.y >= SKY_Y_COORDINATE_METER
}