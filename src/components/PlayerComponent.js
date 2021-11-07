"use strict"

/*******************************************************************************
 * PlayerComponent
 ******************************************************************************/

const PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND = 0.01
const PLAYER_COMPONENT_MAX_PARTICLE_COOLDOWN_SECOND = 0.3


function PlayerComponent(entityManager, particleSystem) {
  this.entityManager = entityManager
  this.particleSystem = particleSystem
}


PlayerComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const {
    gameSystem,
  } = this.entityManager.getSystems()

  const lifeComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_LIFE)
  if (lifeComponent && lifeComponent.hp > 0 && lifeComponent.hp < lifeComponent.maxHP) {
    const lifeOffset = 2
    const offsetLifePercent = Math.max(0, (lifeComponent.hp-lifeOffset)/lifeComponent.maxHP)
    const coolDown = PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND
      + (PLAYER_COMPONENT_MAX_PARTICLE_COOLDOWN_SECOND - PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND)
      * offsetLifePercent
    this.particleSystem.enableParticleEmitter(entityId, coolDown)
  } else {
    this.particleSystem.disableParticleEmitter(entityId)
  }
}
