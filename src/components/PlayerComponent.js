"use strict"

/*******************************************************************************
 * PlayerComponent
 ******************************************************************************/

const PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND = 0.01
const PLAYER_COMPONENT_MAX_PARTICLE_COOLDOWN_SECOND = 0.1


function PlayerComponent(entityManager, particleSystem) {
  this.entityManager = entityManager
  this.particleSystem = particleSystem
}


PlayerComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const {
    gameSystem,
    graphicSystem,
  } = this.entityManager.getSystems()

  const lifeComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_LIFE)
  if (lifeComponent && lifeComponent.hp > 0 && lifeComponent.hp < lifeComponent.maxHP) {
    const lifeOffset = 2
    const offsetLifePercent = Math.max(0, (lifeComponent.hp-lifeOffset)/lifeComponent.maxHP)
    const coolDown = PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND
      + (PLAYER_COMPONENT_MAX_PARTICLE_COOLDOWN_SECOND - PLAYER_COMPONENT_MIN_PARTICLE_COOLDOWN_SECOND)
      * offsetLifePercent
    this.particleSystem.actives[entityId] = true
    const particleEmitter = this.particleSystem.particleEmitters[entityId]
    particleEmitter.coolDownSecondMax = coolDown
    const smokeThickness = Math.round(offsetLifePercent * 255)
    const darkness = {
      red: smokeThickness,
      green: smokeThickness,
      blue: smokeThickness
    }
    particleEmitter.color = darkness
  } else {
    this.particleSystem.disableParticleEmitter(entityId)
  }


}
