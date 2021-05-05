"use strict";

/*******************************************************************************
 * Reisen
 ******************************************************************************/

function Reisen() {}

Reisen.start = function(appContext = {}) {
  Reisen.initialize()
    .then(Reisen.setup)
    .then(appContext => {
      let begin = 0
      const updateFrame = now => {
        // We set a positive value to avoid dividing by 0.
        const elapsedTimeMillisecond = (begin === 0) ? 1 : now - begin 
        begin = now
        Reisen.update(appContext, elapsedTimeMillisecond/1000)
        window.requestAnimationFrame(updateFrame)
      }

      window.requestAnimationFrame(updateFrame)
    })
}

Reisen.initialize = function(appContext = {}) {

  appContext.getEntityManager = () => new EntityManager(appContext.getCanvas())

  appContext.getProjectileFactory = () =>
    Projectile.createFactory(appContext.getEntityManager(), appContext.getImages())

  // Return a dataset which contains keyboard status. Updates are automated.
  appContext.getKeyboardData = () => {
    const keyboardData = ControlSystem.createKeyboardData()
    ControlSystem.setupKeyboardHandlers(keyboardData)
    return keyboardData
  }

  // This creates the player entity on first call.
  appContext.getPlayerEntityId = () => {
    return appContext.getEntityManager().createEntity([
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
  }

  appContext.getPlayerShip = () => {
    return new PlayerShip(
      appContext.getKeyboardData(),
      appContext.getPlayerEntityId(),
      appContext.getEntityManager(),
      appContext.getImages(),
      appContext.getBlaster()
    )
  }

  appContext.getBlaster = () => {
    return new Blaster(
      appContext.getKeyboardData(),
      Projectile.createFactory(
        appContext.getEntityManager(),
        appContext.getImages()
      ),
      appContext.getEntityManager().getPhysicsSystem(),
      appContext.getPlayerEntityId()
    )
  }

	appContext.getCanvas = () => new Canvas()

  // Replace all getters by a lazy getter.
  const lazy = f => {
    let instance = null
    return () => {
      if (instance === undefined || instance === null) instance = f()
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
	appContext.getCanvas().fullScreen()
	// Force the player to be at index 0.
	appContext.getPlayerEntityId()
	// Create the sky.
  Cloud.createSky(appContext.getEntityManager(), appContext.getImages())
	// Center the screen on the player ship.
	appContext.getEntityManager().getGraphicSystem().setTargetEntityId(appContext.getPlayerEntityId())
  return appContext
}

Reisen.update = function(appContext, elapsedTimeSecond) {
  appContext.getPlayerShip().update(elapsedTimeSecond)
  appContext.getEntityManager().update(elapsedTimeSecond)
}
