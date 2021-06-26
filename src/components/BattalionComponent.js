"use strict"

/*******************************************************************************
 * Battallion component manages damages between opposing battalions.
 ******************************************************************************/

const BATTALION_ID_PLAYER = 0
const BATTALION_ID_ENNEMY = 1

const BATTALION_DEFAULT_DAMAGE = 10

const BATTALION_COLLISION_COOLDOWN_SECOND = 1

function BattalionComponent(battalionId) {
  this.battalionId = battalionId
  this.damage = BATTALION_DEFAULT_DAMAGE
}

BattalionComponent.prototype.update = function(entityId, elapsedTimeSecond) {
}

BattalionComponent.createPlayerComponent = function(damage) {
  const component = new BattalionComponent(BATTALION_ID_PLAYER)
  if (damage) component.damage = damage
  return component
}

BattalionComponent.createEnnemyComponent = function(damage) {
  const component = new BattalionComponent(BATTALION_ID_ENNEMY)
  if (damage) component.damage = damage
  return component
}

function BattalionSystem(gameSystem, deathSubscription) {
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
