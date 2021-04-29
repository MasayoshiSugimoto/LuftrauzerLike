"use strict";

/*******************************************************************************
 * Reisen
 ******************************************************************************/

function Reisen() {}

Reisen.start = function(appContext = {}) {
  Reisen.initialize()
    .then(Reisen.setup)
    .then(appContext => {
      const entityManager = appContext.getEntityManager()
      let begin = 0
      const updateFrame = now => {
        // We set a positive value to avoid dividing by 0.
        const elapsedTimeMillisecond = (begin === 0) ? 1 : now - begin 
        begin = now
        entityManager.update(elapsedTimeMillisecond/1000)
        window.requestAnimationFrame(updateFrame)
      }

      window.requestAnimationFrame(updateFrame)
    })
}

Reisen.initialize = function(appContext = {}) {

  appContext.getEntityManager = () => new EntityManager()

  appContext.getProjectileFactory = () =>
    Projectile.createFactory(appContext.getEntityManager(), appContext.getImages())

  // Replace all getters by a lazy getter.
  const lazy = f => {
    let instance = null
    return () => {
      if (!instance) instance = f()
      return instance
    }
  }

  Object.keys(appContext).forEach(f => appContext[f] = lazy(appContext[f]))

  // Wait for image loading.
  return new Promise(done => ImageLoader.load(ImageFactory, IMAGE_DATA, done))
    .then(images => {
      appContext.getImages = () => images
      return appContext
    })
}

Reisen.setup = function(appContext) {
  const createProjectile = appContext.getProjectileFactory()
  const entityManager = appContext.getEntityManager()
  
  // Create some Projectiles.
  for (let i = 0; i < 100; i++) {
    const entityId = createProjectile();
    entityManager.getPhysicsSystem().setupComponent(entityId, {
      position: new Vector2D(i * 0.1, 0),
      velocity: new Vector2D(i * 0.1, 0),
      gravity: true
    })
  }

  return appContext
}
