/********************************************************************************
 * Manages information related to camera
 *******************************************************************************/

import {Vector2D} from '../geometry/Vector2D.js'
import {clamp} from '../core/Math.js'
import {enableCollisionCircle} from '../graphics/CollisionCircle.js'
import {GAME_COMPONENT_ID_CAMERA} from '../game/GameSystem.js'


const CAMERA_MAX_DX_METER = 0.8
const CAMERA_MAX_DY_METER = 0.6


export function Camera(canvas) {
	this.canvas = canvas
	this.targetEntityId = INVALID_ENTITY_ID
}

Camera.prototype.toScreenCoordinates = function(vMeter) {
	const targetPositionMeter = this.physicsSystem.getComponent(this.entityId).position
	let v = vMeter.substract(targetPositionMeter)
	v.y = -v.y
	return v.scalarMultiply(PIXEL_PER_METER).add(new Vector2D(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2))
}


Camera.prototype.setup = function(entityManager, targetEntityId) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.targetEntityId = targetEntityId
  this.entityId = entityManager.createCamera()
  
  const {
    gameSystem,
    physicsSystem,
    graphicSystem
  } = entityManager.getSystems()

  const graphicComponent = graphicSystem.components[this.entityId]
  if (!graphicComponent) return
  graphicComponent.drawFunctions = []

  enableCollisionCircle(this.entityId, entityManager)

  gameSystem.addComponent(this.entityId, GAME_COMPONENT_ID_CAMERA, this)
}


Camera.prototype.update = function(entityId, elapsedTimeSecond) {
  const targetComponent = this.physicsSystem.getComponent(this.targetEntityId)
  if (!targetComponent) return 

  const physicsComponent = this.physicsSystem.getComponent(this.entityId)
  if (!physicsComponent) return
  const position = physicsComponent.position

  const x = targetComponent.position.x
  const y = targetComponent.position.y

  const left = x - CAMERA_MAX_DX_METER
  const right = x + CAMERA_MAX_DX_METER
  const up = y + CAMERA_MAX_DY_METER
  const down = y - CAMERA_MAX_DY_METER
  physicsComponent.position = new Vector2D(
    clamp(left, position.x, right),
    clamp(down, position.y, up)
  )
}


Camera.prototype.screenToGame = function(v) {
  const physicsComponent = this.physicsSystem.getComponent(this.entityId)
  if (!physicsComponent) return Vector2D.ZERO

  const position = physicsComponent.position
  const offset = new Vector2D(-this.canvas.getWidth()/2, this.canvas.getHeight()/2)
  
  return new Vector2D(v.x, -v.y)
    .add(offset)
    .scalarMultiply(1/PIXEL_PER_METER)
    .add(position)
}
