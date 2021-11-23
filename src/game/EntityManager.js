/********************************************************************************
 * EntityManager manages the lifecycle of all entities in the game.
 *******************************************************************************/

import {BattalionSystem} from '../components/BattalionComponent.js'
import {GraphicSystem} from '../graphics/GraphicSystem.js'
import {Subscription} from '../core/Subscription.js'
import {PhysicsSystem} from '../game/PhysicsSystem.js'
import {GameSystem, GAME_COMPONENT_ID_CAMERA} from '../game/GameSystem.js'


export function EntityManager(camera) {
  const maxEntities = 4000

  this.activeCount = 0
  this.actives = []
  for (let i = 0; i < maxEntities; i++) {
    this.actives[i] = false
  }
  this.lastEntityId = 0

  this.deathSubscription = new Subscription()

  const gameSystem = new GameSystem(maxEntities)
  const battalionSystem = new BattalionSystem(gameSystem, this.deathSubscription)
  const physicsSystem = new PhysicsSystem(maxEntities, (id1, id2) => battalionSystem.onCollision(id1, id2))
  this.systems = [
    gameSystem,
    physicsSystem,
    new GraphicSystem(maxEntities, physicsSystem, camera, gameSystem)
  ]

  this.maxEntities = maxEntities
  this.playerEntityId = INVALID_ENTITY_ID
}

EntityManager.SYSTEM_TYPES = {
  GAME: 0,
  PHYSICS: 1,
  GRAPHICS: 2,
  MAX: 3
}

EntityManager.prototype.createEntity = function() {
  // Search the next available entity.
  for (let i = 0; i < this.actives.length; i++) {
    const nextEntityId = (this.lastEntityId+i) % this.actives.length
    if (this.actives[nextEntityId]) continue;
    this.lastEntityId = nextEntityId
    this.actives[this.lastEntityId] = true
    for (let systemId = 0; systemId < EntityManager.SYSTEM_TYPES.MAX; systemId++) {
      this.systems[systemId].createComponent(this.lastEntityId)
    }
    this.activeCount++
    return this.lastEntityId	
  }
  console.log('Failed to create entity. Max number of entity reached.')
  return -1 // Max entity number reached.
}

EntityManager.prototype.deleteEntity = function(entityId) {
  if (!this.actives[entityId]) return
  this.actives[entityId] = false
  this.systems.forEach(x => x.deleteComponent(entityId))
  this.activeCount--
}

EntityManager.prototype.update = function(elapsedTimeSecond) {
  this.systems.forEach(x => x.update(elapsedTimeSecond))
}

EntityManager.prototype.getSystem = function(systemId) {
  return this.systems[systemId]
}

EntityManager.prototype.getGameSystem = function() {
  return this.systems[EntityManager.SYSTEM_TYPES.GAME]
}

EntityManager.prototype.getPhysicsSystem = function() {
  return this.systems[EntityManager.SYSTEM_TYPES.PHYSICS]
}

EntityManager.prototype.getGraphicSystem = function() {
  return this.systems[EntityManager.SYSTEM_TYPES.GRAPHICS]
}

EntityManager.prototype.getSystems = function() {
  return {
    gameSystem: this.getGameSystem(),
    physicsSystem: this.getPhysicsSystem(),
    graphicSystem: this.getGraphicSystem()
  }
}

EntityManager.prototype.getActiveCount = function() {
  return this.activeCount
}

EntityManager.prototype.debugOnCollision = function(entityId1, entityId2) {
  const graphicSystem = this.getGraphicSystem()
  graphicSystem.setColor(entityId1, 'red')
  graphicSystem.setColor(entityId2, 'red')
}

EntityManager.prototype.getDeathSubscription = function() {
  return this.deathSubscription;
}

EntityManager.prototype.isActive = function(entityId) {
  return this.actives[entityId]
}

EntityManager.prototype.createCamera = function() {
  const entityId = this.createEntity()
  this.cameraEntityId = entityId
  return entityId
}

EntityManager.prototype.getCamera = function() {
  const gameSystem = this.getGameSystem()
  return gameSystem.getComponent(this.cameraEntityId, GAME_COMPONENT_ID_CAMERA)
}
