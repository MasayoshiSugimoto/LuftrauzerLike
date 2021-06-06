"use strict"

const DISC_ENTITY_VELOCITY = new Vector2D(1, 0)
const DISC_ENTITY_ENTITY_MAX = 1000

function DiscEntity(entityManager) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])
	this.physicsSystem.getComponent(this.entityId).velocity = DISC_ENTITY_VELOCITY
		.scalarMultiply(Math.random() )
		.rotate(Math.random() * Math.PI * 2)
	const graphicSystem = entityManager.getGraphicSystem()
	graphicSystem.setDisk(this.entityId)
	entityManager.getGameSystem().addComponent(this.entityId, GAME_COMPONENT_ID_DISK_ENTITY, this)
}

DiscEntity.prototype.update = function(entityId, elapsedTimeSecond) {
	const y = this.physicsSystem.getPosition(entityId).y
	const v = this.physicsSystem.getVelocity(entityId)

	if (y < SEA_Y_COORDINATE_METER || y > SKY_Y_COORDINATE_METER) {
		this.physicsSystem.setVelocity(entityId, new Vector2D(v.x, -v.y))
	}
}

function CreateDiscEntities(entityManager) {
	for (let i = 0; i < DISC_ENTITY_ENTITY_MAX; i++) {
		new DiscEntity(entityManager)
	}
}
