"use strict";

Cloud.IMAGE = 'images/Cloud.png'
Cloud.OPACITY = 0.5
Cloud.MIN_SCALE = 1
Cloud.MAX_SCALE = 2
Cloud.SKY_SIZE_PIXEL = 2000 // Square size.
Cloud.CLOUD_NUMBER = 100

function Cloud() {}

Cloud.createFactory = function(entityManager, images) {
  const image = images.get(Cloud.IMAGE)
  return () => {
    const graphicSystem = entityManager.getGraphicSystem()
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
    graphicSystem.setupImage(entityId, image)
    return entityId
  }
}

Cloud.createSky = function(entityManager, images) {
  const createCloud = Cloud.createFactory(entityManager, images)
  const graphicSystem = entityManager.getGraphicSystem()
  const minSkyCoordinate = -Cloud.SKY_SIZE_PIXEL / 2
  for (let i = 0; i < Cloud.CLOUD_NUMBER; i++) {
    const entityId = createCloud()
    graphicSystem.setPosition(entityId, new Vector2D(
      minSkyCoordinate + Math.random() * Cloud.SKY_SIZE_PIXEL,
      minSkyCoordinate + Math.random() * Cloud.SKY_SIZE_PIXEL
    ))
    graphicSystem.setScale(entityId, Cloud.randomScale())
  }
}

Cloud.randomScale = function() {
  return Math.random()
    * (Cloud.MAX_SCALE - Cloud.MIN_SCALE)
    + Cloud.MIN_SCALE
}

