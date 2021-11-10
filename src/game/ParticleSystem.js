/********************************************************************************
* ParticleSystem
********************************************************************************/

import {ComponentFactory} from '../game/ComponentFactory.js'
import {
  GAME_COMPONENT_ID_PARTICLE_COMPONENT,
  GAME_COMPONENT_ID_DEACTIVATION_TIMER
} from '../game/GameSystem.js'


const PARTICLE_SYSTEM_DEFAULT_COOL_DOWN_MAX_SECOND = 0.1
const PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL = 40
const PARTICLE_SYSTEM_DEFAULT_COLOR = "black"
const PARTICLE_SYSTEM_DEFAULT_DELETE_TIME_SECOND = 1
const PARTICLE_SYSTEM_SMOKE_VELOCITY = new Vector2D(0, 0.5)

export function ParticleSystem(maxEntities, canvas) {

  this.actives = new Array(maxEntities)
  for (let i = 0; i < this.actives.length; i++) {
    this.actives[i] = false
  }

  this.particleEmitters = new Array(maxEntities)
  for (let i = 0; i < this.particleEmitters.length; i++) {
    this.particleEmitters[i] = {
      coolDownSecondMax: PARTICLE_SYSTEM_DEFAULT_COOL_DOWN_MAX_SECOND,
      coolDownSecond: 0,
      color: {red: 0, green: 0, blue: 0},
    }
  }

  this.canvasContext = canvas.getContext()
}


ParticleSystem.prototype.update = function(elapsedTimeSecond, entityManager) {
  this.actives.forEach((isActive, entityId) => {
    if (!isActive) return

    const particleEmitter = this.particleEmitters[entityId]

    particleEmitter.coolDownSecond -= elapsedTimeSecond
    if (particleEmitter.coolDownSecond > 0) return
    particleEmitter.coolDownSecond = particleEmitter.coolDownSecondMax

    const dAngleMax = Math.PI/10
    const angle = (Math.random()*dAngleMax*2)-dAngleMax
    const velocity = PARTICLE_SYSTEM_SMOKE_VELOCITY.rotate(angle)
    const particleEntityId = ParticleSystem.createParticle(
      entityManager,
      entityId,
      particleEmitter,
      velocity,
      this.canvasContext
    )
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


ParticleSystem.createParticle = function(
  entityManager,
  particleEmitterEntityId,
  particleEmitter,
  velocity,
  canvasContext
) {
  const entityId = entityManager.createEntity()
  const physicsSystem = entityManager.getPhysicsSystem()
  const graphicSystem = entityManager.getGraphicSystem()
  const gameSystem = entityManager.getGameSystem()

  const width = PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL
  const height = PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL

  const position = physicsSystem.getPosition(particleEmitterEntityId)
  const size = new Vector2D(width/PIXEL_PER_METER, height/PIXEL_PER_METER)
  const physicComponent = physicsSystem.getComponent(entityId)
  physicComponent.gravity = false
  physicComponent.position = position
  physicComponent.velocity = velocity
  physicComponent.size = size

  graphicSystem.setRectangle(entityId, width, height)
  graphicSystem.setColor(entityId, PARTICLE_SYSTEM_DEFAULT_COLOR)

  const componentFactory = new ComponentFactory(entityId, entityManager)
  componentFactory.createDeactivationTimerComponent(PARTICLE_SYSTEM_DEFAULT_DELETE_TIME_SECOND)

  const particleComponent = new ParticleComponent(entityManager, particleEmitter.color, canvasContext)
  gameSystem.addComponent(entityId, GAME_COMPONENT_ID_PARTICLE_COMPONENT, particleComponent)

  return entityId
}


/********************************************************************************
* ParticleComponent
********************************************************************************/

function ParticleComponent(entityManager, color, canvasContext) {
  this.entityManager = entityManager
  this.color = color
  this.canvasContext = canvasContext
}

/*
 * Updates the alpha of the particles to simulate smoke.
 */
ParticleComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const {
    gameSystem,
    graphicSystem,
  } = this.entityManager.getSystems()

  const graphicComponent = graphicSystem.components[entityId]
  if (!graphicComponent) return

  const deactivationComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_DEACTIVATION_TIMER)
  if (!deactivationComponent) return

  const alpha = deactivationComponent.timeSecond/PARTICLE_SYSTEM_DEFAULT_DELETE_TIME_SECOND
  const gradientRadius = PARTICLE_SYSTEM_DEFAULT_PARTICLE_SIZE_PIXEL/2
  const gradient = this.canvasContext.createRadialGradient(0, 0, 1, 0, 0, gradientRadius);
  gradient.addColorStop(0, `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${alpha})`);
  gradient.addColorStop(1, `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, 0)`);
  graphicComponent.color = gradient
}
