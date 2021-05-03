"use strict"

/*******************************************************************************
 * Projectile
 ******************************************************************************/

function Projectile() {}

Projectile.IMAGE_FILE = 'images/Explosion.png'
Projectile.SPEED = 3 // Meter per second.
Projectile.scale = 0.4

Projectile.createFactory = function(entityManager, images) {
  const graphicSystem = entityManager.getGraphicSystem()
  return () => {
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
    const image = images.get(Projectile.IMAGE_FILE)
    graphicSystem.setupImage(entityId, image) 
    graphicSystem.setScale(entityId, Projectile.scale)
    return entityId
  }
}


