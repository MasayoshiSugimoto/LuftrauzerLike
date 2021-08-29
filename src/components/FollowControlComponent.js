"use strict"

/********************************************************************************
* FollowControlComponent
*
* Weak enemy. It's a small copy of the player for the time being. 
********************************************************************************/

const FOLLOW_CONTROL_COMPONENT_MAX_ROTATION_RADIAN_PER_SECOND = Math.PI / 2
const FOLLOW_CONTROL_COMPONENT_INPUT_DATA = {
  left: false,
  right: false,
  boost: false,
  fire: true
}

function FollowControlComponent(entityId, entityManager, targetEntityId, image) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.targetEntityId = targetEntityId
  this.entityId = entityId
}

FollowControlComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const targetPosition = this.physicsSystem.getPosition(this.targetEntityId)
  if (!targetPosition) return
  const position = this.physicsSystem.getPosition(entityId)
  const targetVector = targetPosition.substract(position)

  // Don't do anything if we are very close to the target.
  const distance = targetVector.distance()
  if (distance <= EPSILON) return

  // Rotate in the direction of the target.
  const direction = this.physicsSystem.getDirection(entityId)
  let deltaDirection = Angle.normalize(targetVector.getAngle() - direction)
  const maxAngle = FOLLOW_CONTROL_COMPONENT_MAX_ROTATION_RADIAN_PER_SECOND * elapsedTimeSecond
  if (deltaDirection > maxAngle) deltaDirection = maxAngle
  if (deltaDirection < -maxAngle) deltaDirection = -maxAngle

  const component = this.physicsSystem.getComponent(entityId)
  component.direction = Angle.normalize(direction + deltaDirection)
  component.velocity = Vector2D.X_ONE.rotate(component.direction)
  component.velocityUpdate = false
}

FollowControlComponent.prototype.getInputData = function() {
  return FOLLOW_CONTROL_COMPONENT_INPUT_DATA
}