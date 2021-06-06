"use strict"

/*******************************************************************************
 * Rectangle entities for debug.
 ******************************************************************************/

const RECTANGLE_ENTITY_COLOR = "black"
const RECTANGLE_ENTITY_SIZE = new Vector2D(2, 1)

function RectangleEntity(entityManager, playerEntityId, width, height) {
	this.entityManager = entityManager
	this.playerEntityId = playerEntityId

  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])

	const gameSystem = this.entityManager.getGameSystem()
	gameSystem.addComponent(this.entityId, GAME_COMPONENT_ID_RECTANGLE, this)

	const physicSystem = this.entityManager.getPhysicsSystem()
	physicSystem.setSize(this.entityId, RECTANGLE_ENTITY_SIZE)

	const graphicSystem = this.entityManager.getGraphicSystem()
	graphicSystem.setRectangle(this.entityId, width, height)
	graphicSystem.setColor(this.entityId, RECTANGLE_ENTITY_COLOR)
}

RectangleEntity.prototype.update = function(entityId, elapsedTimeSecond) {
	const physicsSystem = this.entityManager.getPhysicsSystem()
	const playerPosition = physicsSystem.getPosition(this.playerEntityId)
	physicsSystem.setPosition(entityId, playerPosition)
}
