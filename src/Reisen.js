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

  // Returns a function to get user inputs.
  appContext.getInputDataFactory = () => {
    KeyboardControl.setupKeyboardHandlers()
		const controlSystem = new ControlSystem(
			appContext.getEntityManager().getPhysicsSystem(),
			appContext.getPlayerEntityId()
		)
    return () => controlSystem.getInputData()
  }

  // This creates the player entity on first call.
  appContext.getPlayerEntityId = () => {
    return appContext.getEntityManager().createEntity([
			EntityManager.SYSTEM_TYPES.GAME,
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
  }

  appContext.getPlayerShip = () => {
    return new PlayerShip(
      appContext.getPlayerEntityId(),
      appContext.getEntityManager(),
      appContext.getImages(),
      appContext.getBlaster()
    )
  }

  appContext.getBlaster = () => {
    return new Blaster(
      appContext.getInputDataFactory(),
      Projectile.createFactory(
        appContext.getEntityManager(),
        appContext.getImages()
      ),
      appContext.getEntityManager().getPhysicsSystem(),
      appContext.getPlayerEntityId()
    )
  }

	appContext.getCanvas = () => new Canvas()

	appContext.getCamera = () => {
		return new Camera(
			appContext.getCanvas(),
			appContext.getPlayerEntityId(),
			appContext.getEntityManager()
		)
	}

	appContext.getSea = () => {
		return new Sea(
			appContext.getCanvas(),
			appContext.getCamera()
		)
	}

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
	appContext.getSea().draw()
}
