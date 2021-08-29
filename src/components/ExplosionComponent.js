"use strict"

/*******************************************************************************
 * ExplosionComponent
 ******************************************************************************/

function ExplosionComponent(entityManager, images) {
  this.entityManager = entityManager
  this.images = images
}

ExplosionComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const gameSystem = this.entityManager.getGameSystem()
  const lifeComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_LIFE)
  if (!lifeComponent || !lifeComponent.isDead()) return
  this.entityManager.deleteEntity(entityId) 
  const createExplosion = ExplosionEntity.createFactory(this.entityManager, this.images)
  const explosionEntityId = createExplosion()
  
  const physicsSystem = this.entityManager.getPhysicsSystem()
  physicsSystem.setDirection(explosionEntityId, physicsSystem.getDirection(entityId))
  physicsSystem.setPosition(explosionEntityId, physicsSystem.getPosition(entityId))
}

