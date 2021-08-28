"use strict"

/*******************************************************************************
 * BulletEntity
 ******************************************************************************/

function BulletEntity() {}

BulletEntity.IMAGE_FILE = 'images/Explosion.png'
BulletEntity.SPEED = 5 // Meter per second.
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

  // Graphic system setup.
  graphicSystem.setupImage(entityId, image) 
  graphicSystem.setScale(entityId, BulletEntity.scale)
  return entityId
}
