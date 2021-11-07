"use strict"

/********************************************************************************
* ParticleSystem
********************************************************************************/

const PARTICLE_SYSTEM_DEFAULT_COOL_DOWN_MAX_SECOND = 0.1
const PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL = 2
const PARTICLE_SYSTEM_DEFAULT_COLOR = "black"
const PARTICLE_SYSTEM_DEFAULT_DELETE_TIME_SECOND = 1

function ParticleSystem(maxEntities) {

  this.actives = new Array(maxEntities)
  for (let i = 0; i < this.actives.length; i++) {
    this.actives[i] = false
  }

  this.particleEmitters = new Array(maxEntities)
  for (let i = 0; i < this.particleEmitters.length; i++) {
    this.particleEmitters[i] = {
      coolDownSecondMax: PARTICLE_SYSTEM_DEFAULT_COOL_DOWN_MAX_SECOND,
      coolDownSecond: 0,
    }
  }
}


ParticleSystem.prototype.update = function(elapsedTimeSecond, entityManager) {
  this.actives.forEach((isActive, entityId) => {
    if (!isActive) return

    const particleEmitter = this.particleEmitters[entityId]

    particleEmitter.coolDownSecond -= elapsedTimeSecond
    if (particleEmitter.coolDownSecond > 0) return
    particleEmitter.coolDownSecond = particleEmitter.coolDownSecondMax

    const velocity = Vector2D.randomUnit()
    const particleEntityId = ParticleSystem.createParticle(entityManager, entityId, velocity)
  })
}


ParticleSystem.prototype.enableParticleEmitter = function(
    entityId,
    coolDownSecond=PARTICLE_SYSTEM_DEFAULT_COOL_DOWN_MAX_SECOND) {
  if (!this.isValidEntityId(entityId)) return
  this.actives[entityId] = true
  this.particleEmitters[entityId].coolDownSecondMax = coolDownSecond
}

ParticleSystem.prototype.disableParticleEmitter = function(entityId) {
  if (!this.isValidEntityId(entityId)) return
  this.actives[entityId] = false
}

ParticleSystem.prototype.isValidEntityId = function(entityId) {
  return entityId >= 0 && entityId < this.actives.length
}


/********************************************************************************
* Static Functions.
********************************************************************************/


ParticleSystem.createParticle = function(entityManager, particleEmitterEntityId, velocity) {
  const entityId = entityManager.createEntity()
  const physicsSystem = entityManager.getPhysicsSystem()
  const graphicSystem = entityManager.getGraphicSystem()
  const gameSystem = entityManager.getGameSystem()

  const width = PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL
  const height = PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL

  const position = physicsSystem.getPosition(particleEmitterEntityId)
  const size = new Vector2D(width/PIXEL_PER_METER, height/PIXEL_PER_METER)
  const physicComponent = physicsSystem.getComponent(entityId)
  physicComponent.gravity = true
  physicComponent.position = position
  physicComponent.velocity = velocity
  physicComponent.size = size

  graphicSystem.setRectangle(entityId, width, height)
  graphicSystem.setColor(entityId, PARTICLE_SYSTEM_DEFAULT_COLOR)

  const componentFactory = new ComponentFactory(entityId, entityManager)
  componentFactory.createDeactivationTimerComponent(PARTICLE_SYSTEM_DEFAULT_DELETE_TIME_SECOND)

  return entityId
}

