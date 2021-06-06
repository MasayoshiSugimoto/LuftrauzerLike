"use strict"

const DISC_ENTITY_VELOCITY = new Vector2D(1, 0)
const DISC_ENTITY_ENTITY_MAX = 1000
const DISC_ENTITY_RADIUS = 0.05

function DiscEntity(entityManager) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])

  const physicComponent = this.physicsSystem.getComponent(this.entityId)
	physicComponent.velocity = DISC_ENTITY_VELOCITY
		.scalarMultiply(Math.random())
		.rotate(Math.random() * Math.PI * 2)
  physicComponent.size = new Vector2D(DISC_ENTITY_RADIUS, DISC_ENTITY_RADIUS)

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
