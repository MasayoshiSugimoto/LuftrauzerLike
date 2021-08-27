"use strict"

/*******************************************************************************
 * RectangleComponent for debugging.
 ******************************************************************************/

const RECTANGLE_ENTITY_COLOR = "black"
const RECTANGLE_ENTITY_SIZE = new Vector2D(2, 1)

function RectangleComponent(entityId, entityManager, playerEntityId, width, height) {
  this.entityId = entityId
  this.entityManager = entityManager
  this.playerEntityId = playerEntityId

  const physicSystem = this.entityManager.getPhysicsSystem()
  physicSystem.setSize(this.entityId, RECTANGLE_ENTITY_SIZE)

  const graphicSystem = this.entityManager.getGraphicSystem()
  graphicSystem.setRectangle(this.entityId, width, height)
  graphicSystem.setColor(this.entityId, RECTANGLE_ENTITY_COLOR)
}

RectangleComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const physicsSystem = this.entityManager.getPhysicsSystem()
  const playerPosition = physicsSystem.getPosition(this.playerEntityId)
  physicsSystem.setPosition(entityId, playerPosition)
}
