/*******************************************************************************
 * Mouse as entity. This is for debug.
 ******************************************************************************/

import {ComponentFactory} from '../game/ComponentFactory.js'
import {BATTALION_ID_ENNEMY} from '../components/BattalionComponent.js'
import {enableCollisionCircle} from '../graphics/CollisionCircle.js'
import {GAME_COMPONENT_ID_FOLLOW_MOUSE_COMPONENT} from '../game/GameSystem.js'
import {DEBUG_ENABLED} from '../game/Debug.js'


export function createMouseEntity(entityManager) {
  return
  const {gameSystem, physicsSystem, graphicSystem} = entityManager.getSystems()
  const entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, entityManager)

  componentFactory.createBattalionComponent(BATTALION_ID_ENNEMY)

  const mouseComponent = new FollowMouseComponent(entityManager)
  gameSystem.addComponent(entityId, GAME_COMPONENT_ID_FOLLOW_MOUSE_COMPONENT, mouseComponent)

  const graphicComponent = graphicSystem.components[entityId]
  graphicComponent.drawFunctions = []

  enableCollisionCircle(entityId, entityManager)

  return entityId
}


function FollowMouseComponent(entityManager) {
  this.entityManager = entityManager
}


FollowMouseComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  // Calculate the coordinates of the mouse in game space.
  // Coordinates of screen space is relative to player coordinates.
  // Introduce matrix transform for the camera.
  const {physicsSystem} = this.entityManager.getSystems()

  const physicsComponent = physicsSystem.components[entityId]

  physicsComponent.collision = DEBUG_ENABLED
}
