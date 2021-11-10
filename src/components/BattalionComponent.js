/*******************************************************************************
 * Battallion component manages damages between opposing battalions.
 ******************************************************************************/

import {
  GAME_COMPONENT_ID_BATTALION,
  GAME_COMPONENT_ID_LIFE
} from '../game/GameSystem.js'


export const BATTALION_ID_PLAYER = 0
export const BATTALION_ID_ENNEMY = 1

const BATTALION_DEFAULT_DAMAGE = 10
const BATTALION_COLLISION_COOLDOWN_SECOND = 1

export function BattalionComponent(battalionId, damage) {
  this.battalionId = battalionId
  this.damage = damage ? damage : BATTALION_DEFAULT_DAMAGE
}

BattalionComponent.prototype.update = function(entityId, elapsedTimeSecond) {
}

export function BattalionSystem(gameSystem) {
  this.gameSystem = gameSystem
  this.collisionMap = new Map()
}

BattalionSystem.prototype.onCollision = function(entityId1, entityId2) {
  const battalionComponent1 = this.gameSystem.getComponent(entityId1, GAME_COMPONENT_ID_BATTALION)
  if (!battalionComponent1) return

  const battalionComponent2 = this.gameSystem.getComponent(entityId2, GAME_COMPONENT_ID_BATTALION)
  if (!battalionComponent2) return

  if (battalionComponent1.battalionId === battalionComponent2.battalionId) return

  const hpComponent1 = this.gameSystem.getComponent(entityId1, GAME_COMPONENT_ID_LIFE)
  if (hpComponent1) {
    hpComponent1.takeDamage(battalionComponent2.damage)
  }

  const hpComponent2 = this.gameSystem.getComponent(entityId2, GAME_COMPONENT_ID_LIFE)
  if (hpComponent2) {
    hpComponent2.takeDamage(battalionComponent1.damage)
  }
}
