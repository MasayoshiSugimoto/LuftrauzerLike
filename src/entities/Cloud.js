"use strict"

/*******************************************************************************
 * Cloud
 ******************************************************************************/

Cloud.IMAGE = 'images/Cloud.png'
Cloud.OPACITY = 0.5
Cloud.MIN_SCALE = 0.5
Cloud.MAX_SCALE = 2
Cloud.CLOUD_NUMBER = 100

function Cloud() {}

Cloud.createFactory = function(entityManager, image) {
  return () => {
    const graphicSystem = entityManager.getGraphicSystem()
    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.PHYSICS,
      EntityManager.SYSTEM_TYPES.GRAPHICS
    ])
    graphicSystem.setupImage(entityId, image)
    return entityId
  }
}

Cloud.createSky = function(entityManager, images) {
  const image = images.get(Cloud.IMAGE)
  const createCloud = Cloud.createFactory(entityManager, image)
  const physicsSystem = entityManager.getPhysicsSystem()
  const graphicSystem = entityManager.getGraphicSystem()
  for (let i = 0; i < Cloud.CLOUD_NUMBER; i++) {
    const entityId = createCloud()
		// Higher distribution of cloud higher in the sky.
		const r = Math.sqrt((Math.random()*100))/10
		const y = r*SKY_Y_COORDINATE_METER
    physicsSystem.setPosition(entityId, new Vector2D(
      -(GAME_SPACE_WIDTH_METER / 2) + Math.random() * GAME_SPACE_WIDTH_METER,
      y
    ))
		// Higher clouds will be bigger.
		const scale = r
			* (Cloud.MAX_SCALE - Cloud.MIN_SCALE)
			+ Cloud.MIN_SCALE
    physicsSystem.setSizeFromImage(entityId, image, scale)
		graphicSystem.setOpacity(entityId, Cloud.OPACITY)
  }
}
