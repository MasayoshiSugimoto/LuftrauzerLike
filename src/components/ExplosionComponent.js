/*******************************************************************************
 * ExplosionComponent
 ******************************************************************************/

import {ExplosionEntity} from '../entities/ExplosionEntity.js'


export function ExplosionComponent(entityManager, images, scale) {
  this.entityManager = entityManager
  this.images = images
  this.scale = scale
}

ExplosionComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const {
    gameSystem,
    physicsSystem,
    graphicSystem
  } = this.entityManager.getSystems()

  // Delete the entity and replace it by an explosion entity.
  const lifeComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_LIFE)
  if (!lifeComponent || !lifeComponent.isDead()) return
  this.entityManager.deleteEntity(entityId) 

  const createExplosion = ExplosionEntity.createFactory(this.entityManager, this.images)
  const explosionEntityId = createExplosion()
  physicsSystem.setDirection(explosionEntityId, physicsSystem.getDirection(entityId))
  physicsSystem.setPosition(explosionEntityId, physicsSystem.getPosition(entityId))
  if (this.scale) {
    const image = graphicSystem.getImage(explosionEntityId)
    physicsSystem.setSizeFromImage(explosionEntityId, image, this.scale)
  }
}

