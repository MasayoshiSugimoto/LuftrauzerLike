"use strict"

/********************************************************************************
* TinyShipComponent
*
* Weak enemy. It's a small copy of the player for the time being. 
********************************************************************************/

const TINY_SHIP_SCALE = 0.5
const TINY_SHIP_MAX_ROTATION_RADIAN_PER_SECOND = Math.PI / 2
const TINY_SHIP_MAX_HP = 1

function TinyShipComponent(entityId, entityManager, targetEntityId, image) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.targetEntityId = targetEntityId
  this.entityId = entityId

  const componentFactory = new ComponentFactory(entityId, entityManager)

  // Game system setup.
  const gameSystem = entityManager.getGameSystem()
  componentFactory.createBattalionComponent(BATTALION_ID_ENNEMY)
  componentFactory.createLifeComponent(GAME_COMPONENT_ID_LIFE)

  // Physics system setup.
  const physicsSystem = entityManager.getPhysicsSystem()
  physicsSystem.enableCollision(this.entityId)

  // Graphic system setup.
  const graphicSystem = entityManager.getGraphicSystem()
  graphicSystem.setupImage(this.entityId, image)
  graphicSystem.setScale(this.entityId, TINY_SHIP_SCALE)
}

TinyShipComponent.prototype.update = function(entityId, elapsedTimeSecond) {
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
  const maxAngle = TINY_SHIP_MAX_ROTATION_RADIAN_PER_SECOND * elapsedTimeSecond
  if (deltaDirection > maxAngle) deltaDirection = maxAngle
  if (deltaDirection < -maxAngle) deltaDirection = -maxAngle

  const component = this.physicsSystem.getComponent(entityId)
  component.direction = Angle.normalize(direction + deltaDirection)
  component.velocity = Vector2D.X_ONE.rotate(component.direction)
  component.velocityUpdate = false
}