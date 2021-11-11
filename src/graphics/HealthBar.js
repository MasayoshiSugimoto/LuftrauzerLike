/********************************************************************************
 * HealthBar draw an entity health bar.
 *******************************************************************************/

import {GAME_COMPONENT_ID_LIFE} from '../game/GameSystem.js'
import {Vector2D} from '../geometry/Vector2D.js'
import {DEBUG_ENABLED} from '../game/Debug.js'


const HEALTH_BAR_WIDTH = 50
const HEALTH_BAR_HEIGHT = 5
const HEALTH_BAR_DELTA_Y = -30
const HEALTH_BAR_BACKGROUND_COLOR = 'black'
const HEALTH_BAR_FOREGROUND_COLOR = 'green'
const HEALTH_BAR_BORDER_PX = 1


export function enableHealthBar(entityId, entityManager) {
  const { graphicSystem } = entityManager.getSystems()
  const graphicComponent = graphicSystem.components[entityId]
  if (!graphicComponent) return

  const draw = (context, graphicComponent) => {
    if (!DEBUG_ENABLED) return

    const { gameSystem, graphicSystem } = entityManager.getSystems()

    const lifeComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_LIFE)
    if (!lifeComponent || lifeComponent.getHP() <= 0) return

    const p = new Vector2D(-HEALTH_BAR_WIDTH/2, HEALTH_BAR_DELTA_Y)
    context.save()
    context.fillStyle = HEALTH_BAR_BACKGROUND_COLOR
    context.fillRect(p.x, p.y, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT)
    context.fillStyle = HEALTH_BAR_FOREGROUND_COLOR
    context.fillRect(
      p.x+HEALTH_BAR_BORDER_PX,
      p.y+HEALTH_BAR_BORDER_PX,
      HEALTH_BAR_WIDTH*(lifeComponent.getHP()/lifeComponent.getMaxHP())-(2*HEALTH_BAR_BORDER_PX),
      HEALTH_BAR_HEIGHT-(2*HEALTH_BAR_BORDER_PX)
    )
    context.restore()
  }

  graphicComponent.drawFunctions.push(draw)
}
