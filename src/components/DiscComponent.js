"use strict"

/********************************************************************************
 * DiscComponent
 *******************************************************************************/

const DISC_COMPONENT_VELOCITY = new Vector2D(1, 0)
const DISC_COMPONENT_RADIUS_MIN = 0.05
const DISC_COMPONENT_RADIUS_MAX = 0.2

function DiscComponent(entityId, entityManager) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.entityId = entityId

  const physicComponent = this.physicsSystem.getComponent(this.entityId)
	physicComponent.velocity = DISC_COMPONENT_VELOCITY
		.scalarMultiply(Math.random())
		.rotate(Math.random() * Math.PI * 2)
  const size = Math.random() * (DISC_COMPONENT_RADIUS_MAX-DISC_COMPONENT_RADIUS_MIN) + DISC_COMPONENT_RADIUS_MIN
  physicComponent.size = new Vector2D(size, size)
  physicComponent.collision = true

	const graphicSystem = entityManager.getGraphicSystem()
	graphicSystem.setDisk(this.entityId)
}

DiscComponent.prototype.update = function(entityId, elapsedTimeSecond) {
	const y = this.physicsSystem.getPosition(entityId).y
	const v = this.physicsSystem.getVelocity(entityId)

	if (y < SEA_Y_COORDINATE_METER) {
		this.physicsSystem.setVelocity(entityId, new Vector2D(v.x, Math.abs(v.y)))
	}

	if (y > SKY_Y_COORDINATE_METER) {
		this.physicsSystem.setVelocity(entityId, new Vector2D(v.x, -Math.abs(v.y)))
	}
}


