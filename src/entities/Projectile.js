"use strict"

/*******************************************************************************
 * Projectile
 ******************************************************************************/

function Projectile() {}

Projectile.IMAGE_FILE = 'images/Explosion.png'
Projectile.SPEED = 5 // Meter per second.
Projectile.SIZE = new Vector2D(0.2, 0.2)
Projectile.LIFE_TIME_SECOND = 2

Projectile.createFactory = function(entityManager, images) {
  const graphicSystem = entityManager.getGraphicSystem()
  const physicsSystem = entityManager.getPhysicsSystem()
  const image = images.get(Projectile.IMAGE_FILE)
  return () => {
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.GAME,
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
    const componentFactory = new ComponentFactory(entityId, entityManager)

    // Game system setup.
    const deactivationTimerComponent = componentFactory.createDeactivationTimerComponent(Projectile.LIFE_TIME_SECOND)

    // Physic system setup.
    physicsSystem.setSize(entityId, Projectile.SIZE)

    // Graphic system setup.
    graphicSystem.setupImage(entityId, image) 
    graphicSystem.setScale(entityId, Projectile.scale)
    return entityId
  }
}


