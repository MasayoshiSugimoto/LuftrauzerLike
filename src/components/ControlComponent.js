/*******************************************************************************
 * ControlComponent
 *
 * This class manages user inputs. It also takes control of the player if he
 * goes in the sea on in the sky.
 ******************************************************************************/

import {Angle} from '../geometry/Angle.js'
import {PhysicEntity} from '../game/PhysicEntity.js'
import {Vector2D} from '../geometry/Vector2D.js'


const KEYBOARD_KEY_ENTER  = 'Enter'
const KEYBOARD_KEY_E      = 'KeyE'
const KEYBOARD_KEY_A      = 'KeyA'
const KEYBOARD_KEY_D      = 'KeyD'
const KEYBOARD_KEY_SPACE  = 'Space'
const KEYBOARD_KEY_UP     = 'ArrowUp'
const KEYBOARD_KEY_LEFT   = 'ArrowLeft'
const KEYBOARD_KEY_RIGHT  = 'ArrowRight'

const CONTROL_COMPONENT_ROTATION_UNIT = Math.PI * 2; // Rotation allowed per second.
const CONTROL_COMPONENT_BOOST_UNIT = 10 // Velocity in meter/s^2.

export function ControlComponent(entityId, entityManager) {
  this.entityManager = entityManager
  const physicsSystem = entityManager.getPhysicsSystem()
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

  const inputData = this.getInputData()
  const physicEntity = new PhysicEntity(
    entityId,
    this.entityManager.getPhysicsSystem()
  )

  // Rotates depending on inputs.
  let direction = physicEntity.getDirection(entityId)
  if (inputData.left) {
    direction -= CONTROL_COMPONENT_ROTATION_UNIT * elapsedTimeSecond
  } else if (inputData.right) {
    direction += CONTROL_COMPONENT_ROTATION_UNIT * elapsedTimeSecond
  }
  direction = Angle.normalize2PI(direction)
  physicEntity.setDirection(direction)

  // Change acceleration depending on inputs.
  const boost = inputData.boost ? CONTROL_COMPONENT_BOOST_UNIT : 0
  physicEntity.setAcceleration(new Vector2D(boost, 0).rotate(direction))
}


export function KeyboardControl() {}

KeyboardControl.inputData = {
	left: false,
	right: false,
	boost: false,
	fire: false
}

KeyboardControl.keys = [
  'Enter',
  'KeyW',
  'KeyA',
  'KeyD',
  'Space',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight'
]

KeyboardControl.keyStates = new Array(KeyboardControl.keys.length).map(x => false)

KeyboardControl.setupKeyboardHandlers = function() {
	const inputData = KeyboardControl.inputData
  window.onkeydown = event => {
    KeyboardControl.keys.forEach((key, index) => {
      if (event.code === key) {
        KeyboardControl.keyStates[index] = true
      }
    })
    KeyboardControl.update()
  }

  window.onkeyup = event => {
    KeyboardControl.keys.forEach((key, index) => {
      if (event.code === key) {
        KeyboardControl.keyStates[index] = false
      }
    })
    KeyboardControl.update()
  }
}

KeyboardControl.update = function() {
  const isDown = keyCode => {
    const index = KeyboardControl.keys.indexOf(keyCode)
    if (index < 0) return false
    return KeyboardControl.keyStates[index]
  }

  KeyboardControl.inputData = {
    left: isDown('KeyA') || isDown('ArrowLeft'),
    right: isDown('KeyD') || isDown('ArrowRight'),
    boost: isDown('KeyW') || isDown('ArrowUp'),
    fire: isDown('Space')
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
