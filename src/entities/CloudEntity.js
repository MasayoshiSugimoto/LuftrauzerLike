"use strict"

/*******************************************************************************
 * CloudEntity
 ******************************************************************************/

function CloudEntity() {}

CloudEntity.IMAGE = 'images/Cloud.png'
CloudEntity.OPACITY = 0.5
CloudEntity.MIN_SCALE = 0.5
CloudEntity.MAX_SCALE = 2
CloudEntity.CLOUD_NUMBER = 100

CloudEntity.create = function(entityManager, image) {
  const entityId = entityManager.createEntity()
  entityManager.getGraphicSystem().setupImage(entityId, image)
  return entityId
}

CloudEntity.createSky = function(entityManager, images) {
  const image = images.get(CloudEntity.IMAGE)
  const physicsSystem = entityManager.getPhysicsSystem()
  const graphicSystem = entityManager.getGraphicSystem()
  for (let i = 0; i < CloudEntity.CLOUD_NUMBER; i++) {
    const entityId = CloudEntity.create(entityManager, image)
    // Higher distribution of cloud higher in the sky.
    const r = Math.sqrt((Math.random()*100))/10
    const y = r*SKY_Y_COORDINATE_METER
    physicsSystem.setPosition(entityId, new Vector2D(
      -(GAME_SPACE_WIDTH_METER / 2) + Math.random() * GAME_SPACE_WIDTH_METER,
      y
    ))
    // Higher clouds will be bigger.
    const scale = r
    * (CloudEntity.MAX_SCALE - CloudEntity.MIN_SCALE)
      + CloudEntity.MIN_SCALE
    physicsSystem.setSizeFromImage(entityId, image, scale)
    graphicSystem.setOpacity(entityId, CloudEntity.OPACITY)
  }
}
