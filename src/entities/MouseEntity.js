/*******************************************************************************
 * Mouse as entity. This is for debug.
 ******************************************************************************/

import {ComponentFactory} from '../game/ComponentFactory.js'
import {BATTALION_ID_ENNEMY} from '../components/BattalionComponent.js'
import {enableCollisionCircle} from '../graphics/CollisionCircle.js'
import {GAME_COMPONENT_ID_FOLLOW_MOUSE_COMPONENT} from '../game/GameSystem.js'
import {DEBUG_ENABLED} from '../game/Debug.js'
import {GraphicSystem} from '../graphics/GraphicSystem.js'
import {Vector2D} from '../geometry/Vector2D.js'


let mouseCoordinates = new Vector2D()


export function createMouseEntity(entityManager) {
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


FollowMouseComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  if (!DEBUG_ENABLED) return

  const camera = this.entityManager.getCamera()
  if (!camera) return
  
  const {physicsSystem} = this.entityManager.getSystems()

  const physicsComponent = physicsSystem.components[entityId]
  physicsComponent.collision = DEBUG_ENABLED
  physicsComponent.position = camera.screenToGame(mouseCoordinates)
}


function FollowMouseComponent(entityManager) {
  this.entityManager = entityManager
}

function setupMouseTracker() {
  document.body.onmousemove = (event) => {
    mouseCoordinates = new Vector2D(event.clientX, event.clientY)
  }
}

setupMouseTracker()
