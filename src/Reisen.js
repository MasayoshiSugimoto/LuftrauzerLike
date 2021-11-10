/*******************************************************************************
 * Reisen
 ******************************************************************************/

import {setupDebug, updateDebug} from './game/Debug.js'
import {EntityManager} from './game/EntityManager.js'
import {Canvas} from './core/Canvas.js'


function Reisen() {}

Reisen.prototype.start = function(appContext = {}) {
  this.restart = false
  this.initialize()
    .then(this.setup)
    .then(appContext => {
      let begin = 0
      const updateFrame = now => {
        if (this.restart) {
          new Reisen().start()
          return
        }

        // We set a positive value to avoid dividing by 0.
        const elapsedTimeMillisecond = (begin === 0) ? 1 : now - begin 
        const cappedElapsedTimeMillisecond = Math.min(elapsedTimeMillisecond, 1000/30)
        begin = now
        this.update(appContext, cappedElapsedTimeMillisecond/1000)
        window.requestAnimationFrame(updateFrame)
      }
      window.requestAnimationFrame(updateFrame)
    })
}

Reisen.prototype.initialize = function(appContext = {}) {

  appContext.getEntityManager = () => new EntityManager(appContext.getCanvas())

  appContext.getProjectileFactory = () =>
    Projectile.createFactory(appContext.getEntityManager(), appContext.getImages())

  // This creates the player entity on first call.
  appContext.getPlayerEntityId = () => {
    const playerEntityId = appContext.getEntityManager().createEntity()
    appContext
      .getEntityManager()
      .getPhysicsSystem()
      .setPlayerEntityId(playerEntityId)
    return playerEntityId
  }

  appContext.getPlayerPlaneEntity = () => {
    return PlayerPlaneEntity.create(
      appContext.getPlayerEntityId(),
      appContext.getEntityManager(),
      appContext.getImages(),
      appContext.getParticleSystem()
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

  appContext.getTinyPlanePopper = () => {
    return new TinyPlanePopper(
      appContext.getEntityManager(),
      appContext.getPlayerEntityId(),
      appContext.getImages()
    )
  }

  appContext.getParticleSystem = () => new ParticleSystem(
    appContext.getEntityManager().maxEntities,
    appContext.getCanvas()
  )

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
  return new Promise(done => loadImage(IMAGE_DATA, done))
    .then(images => {
      appContext.getImages = () => images
      return appContext
    })
}

Reisen.prototype.setup = function(appContext) {
  KeyboardControl.setupKeyboardHandlers()
  appContext.getCanvas().fullScreen()
  // Force the player to be at index 0.
  appContext.getPlayerPlaneEntity()
  // Create the sky.
  CloudEntity.createSky(appContext.getEntityManager(), appContext.getImages())
  // Center the screen on the player ship.
  appContext.getEntityManager().getGraphicSystem().setTargetEntityId(appContext.getPlayerEntityId())

  setupDebug()

  return appContext
}

Reisen.prototype.update = function(appContext, elapsedTimeSecond, canvas) {
  const entityManager = appContext.getEntityManager()

  updateDebug(entityManager, elapsedTimeSecond)
  appContext.getTinyPlanePopper().update(elapsedTimeSecond)
  appContext.getParticleSystem().update(elapsedTimeSecond, entityManager)
  entityManager.update(elapsedTimeSecond)
  appContext.getSea().draw()
  drawSky(appContext.getCanvas(), appContext.getCamera())
  this.checkGameOver(appContext)
}

Reisen.prototype.checkGameOver = function(appContext) {
  const playerId = appContext.getPlayerEntityId()
  if (!appContext.getEntityManager().isActive(playerId)) {
    this.scheduleRestart()
  }
}

Reisen.prototype.scheduleRestart = function() {
  const restartDelayMillisecond = 2000
  setTimeout(() => this.restart = true, restartDelayMillisecond)
}


function loadImage(imageUrls, onFinishCallback) {
  let counter = 0;
  const images = new Map();

  for (let index = 0; index < imageUrls.length; index++) {
    //Load all the registered images.
    const image = new Image()
    images.set(imageUrls[index], image);
    image.onload = () => {
      counter++;
      if (counter >= imageUrls.length) {
        //When load is finished, can the callback function.
        onFinishCallback(images);
      }
    };
    image.src = imageUrls[index];
  }
}


// Start the program.
window.onload = function() { new Reisen().start() }

