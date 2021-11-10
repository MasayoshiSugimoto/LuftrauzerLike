/*******************************************************************************
 * ExplosionEntity
 ******************************************************************************/

import {ComponentFactory} from '../game/ComponentFactory.js'


const EXPLOSION_ENTITY_IMAGE_PATH = 'images/Explosion.png'
const EXPLOSION_ENTITY_FADEOUT_TIME_SECOND = 1

export function ExplosionEntity() {}

ExplosionEntity.create = function(entityManager, explosionImage) {
  const entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, entityManager)
  componentFactory.createFadeoutComponent(explosionImage, EXPLOSION_ENTITY_FADEOUT_TIME_SECOND)
  return entityId
}

ExplosionEntity.createFactory = function(entityManager, images) {
  const explosionImage = images.get(EXPLOSION_ENTITY_IMAGE_PATH)
  return () => ExplosionEntity.create(entityManager, explosionImage)
}
