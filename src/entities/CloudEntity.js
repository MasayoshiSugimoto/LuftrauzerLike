/*******************************************************************************
 * CloudEntity
 ******************************************************************************/

import {Vector2D} from '../geometry/Vector2D.js'
import {HashMap2D} from '../game/HashMap2D.js'
import {PhysicsSystem} from '../game/PhysicsSystem.js'


export function CloudEntity() {}

CloudEntity.IMAGE = 'images/Cloud.png'
CloudEntity.OPACITY = 0.5
CloudEntity.MIN_SCALE = 0.5
CloudEntity.MAX_SCALE = 2
CloudEntity.CLOUD_NUMBER = 50
CloudEntity.MAP_CELL_INTERVAL = 0.1


CloudEntity.create = function(entityManager, image) {
  const entityId = entityManager.createEntity()
  entityManager.getGraphicSystem().setupImage(entityId, image)
  return entityId
}

CloudEntity.createSky = function(entityManager, images) {
  const image = images.get(CloudEntity.IMAGE)
  const physicsSystem = entityManager.getPhysicsSystem()
  const graphicSystem = entityManager.getGraphicSystem()
  const randomDistribution = x => x
  const randomRange = 5
  const maxRandom = randomDistribution(randomRange)
  const entityIds = []
  for (let i = 0; i < CloudEntity.CLOUD_NUMBER; i++) {
    const entityId = CloudEntity.create(entityManager, image)
    entityIds.push(entityId)
    // Higher distribution of cloud higher in the sky.
    const x = -(GAME_SPACE_WIDTH_METER / 2) + Math.random() * GAME_SPACE_WIDTH_METER
    const f = x => Math.pow(4,x)
    const r = 1-randomDistribution(Math.random()*randomRange)/maxRandom
    const y = r*SKY_Y_COORDINATE_METER
    const position = new Vector2D(x, y)
    physicsSystem.setPosition(entityId, position)

    // Higher clouds will be bigger.
    const scale = r
    * (CloudEntity.MAX_SCALE - CloudEntity.MIN_SCALE)
      + CloudEntity.MIN_SCALE
    physicsSystem.setSizeFromImage(entityId, image, scale)
    graphicSystem.setOpacity(entityId, CloudEntity.OPACITY)
  }

  // Increase space between clouds.
  const maxIterations = 100
  const map2D = new HashMap2D(
    -GAME_SPACE_WIDTH_METER/2,
    SEA_Y_COORDINATE_METER,
    GAME_SPACE_WIDTH_METER,
    SKY_Y_COORDINATE_METER - SEA_Y_COORDINATE_METER,
    CloudEntity.MAP_CELL_INTERVAL
  )
  const displacement = 0.1
  entityIds.forEach(entityId => {
    const component = physicsSystem.components[entityId]
    map2D.addEntity(entityId, component.position, getRadius(component))
  })
  for (let it = 0; it < maxIterations; it++) {
    entityIds.forEach(entityId => {
      const component = physicsSystem.components[entityId]
      const radius = getRadius(component)
      const position = component.position

      const otherClouds = map2D.searchEntities(position.x, position.y, radius)
      otherClouds.forEach(otherCloudEntityId => {
        const otherComponent = physicsSystem.components[otherCloudEntityId]
        const dPosition = position.substract(otherComponent.position)
          .resize(displacement)
        component.position = component.position.add(dPosition)
        // Keep the clouds away from the sea level.
        component.position.y = Math.max(0, component.position.y)
      })
      map2D.updateEntity(entityId, component.position, radius)
    })
  }

}


function getRadius(physicsComponent) {
  return 0.5
}
