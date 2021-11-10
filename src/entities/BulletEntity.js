/*******************************************************************************
 * BulletEntity
 ******************************************************************************/

import {ComponentFactory} from '../game/ComponentFactory.js'
import {Vector2D} from '../geometry/Vector2D.js'


export function BulletEntity() {}

BulletEntity.IMAGE_FILE = 'images/Explosion.png'
BulletEntity.SIZE = new Vector2D(0.2, 0.2)
BulletEntity.LIFE_TIME_SECOND = 2

BulletEntity.createFactory = function(entityManager, images) {
  const graphicSystem = entityManager.getGraphicSystem()
  const physicsSystem = entityManager.getPhysicsSystem()
  const image = images.get(BulletEntity.IMAGE_FILE)
  return () => BulletEntity.create(entityManager, physicsSystem, graphicSystem, image)
}

BulletEntity.create = function(entityManager, physicsSystem, graphicSystem, image) {
  const entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, entityManager)

  // Game system setup.
  const deactivationTimerComponent = componentFactory
    .createDeactivationTimerComponent(BulletEntity.LIFE_TIME_SECOND)

  // Physic system setup.
  physicsSystem.setSize(entityId, BulletEntity.SIZE)
  physicsSystem.enableCollision(entityId)

  // Graphic system setup.
  graphicSystem.setupImage(entityId, image) 
  graphicSystem.setScale(entityId, BulletEntity.scale)
  return entityId
}
