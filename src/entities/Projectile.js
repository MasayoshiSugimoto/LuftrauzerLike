"use strict"

/*******************************************************************************
 * Projectile
 ******************************************************************************/

function Projectile() {}

Projectile.IMAGE_FILE = 'images/Explosion.png'

Projectile.createFactory = function(entityManager, images) {
  return () => {
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
    const image = images.get(Projectile.IMAGE_FILE)
    entityManager.getGraphicSystem().setupImage(entityId, image) 
    return entityId
  }
}


