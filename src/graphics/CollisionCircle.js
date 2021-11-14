/********************************************************************************
 * Collision Circle.
 *******************************************************************************/

import {PhysicsSystem} from '../game/PhysicsSystem.js'
import {DEBUG_ENABLED} from '../game/Debug.js'

export function enableCollisionCircle(entityId, entityManager) {
  const { graphicSystem } = entityManager.getSystems()
  const graphicComponent = graphicSystem.components[entityId]
  if (!graphicComponent) return

  const d = (context, graphicComponent) => draw(context, entityManager, entityId, graphicComponent)
  graphicComponent.drawFunctions.push(d)
}

function draw(context, entityManager, entityId, graphicComponent) {
  if (!DEBUG_ENABLED) return

  const {physicsSystem} = entityManager.getSystems(entityId)
  if (!physicsSystem) return

  const physicComponent = physicsSystem.getComponent(entityId)
  if (!physicComponent) return

  const position = graphicComponent.position
  const radius = PhysicsSystem.getRadius(physicComponent) * PIXEL_PER_METER

  context.beginPath()
  context.arc(0, 0, radius, 0, 2 * Math.PI, false)
  context.strokeStyle = 'white'
  context.stroke()
}

