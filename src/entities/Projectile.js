"use strict"

/*******************************************************************************
 * Projectile
 ******************************************************************************/

function Projectile() {}

Projectile.IMAGE_FILE = 'images/Explosion.png'
Projectile.SPEED = 5 // Meter per second.
Projectile.scale = 0.4
Projectile.LIFE_TIME_SECOND = 2

Projectile.createFactory = function(entityManager, images) {
  const graphicSystem = entityManager.getGraphicSystem()
  const image = images.get(Projectile.IMAGE_FILE)
  return () => {
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.GAME,
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])

    // Game system setup.
    const deactivationTimerComponent = new DeactivationTimerComponent(
      Projectile.LIFE_TIME_SECOND,
      entityManager
    )
    entityManager.getGameSystem().addComponent(
      entityId,
      GAME_COMPONENT_ID_DEACTIVATION_TIMER,
      deactivationTimerComponent
    )

    // Graphic system setup.
    graphicSystem.setupImage(entityId, image) 
    graphicSystem.setScale(entityId, Projectile.scale)
    return entityId
  }
}


