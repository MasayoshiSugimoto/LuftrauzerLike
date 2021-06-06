"use strict"

/********************************************************************************
* EntityManager manages the lifecycle of all entities in the game.
********************************************************************************/

function EntityManager(canvas) {
	const maxEntities = 2000

  this.activeCount = 0
	this.actives = []
	for (let i = 0; i < maxEntities; i++) {
		this.actives[i] = false
	}
	this.lastEntityId = 0
  const physicsSystem = new PhysicsSystem(maxEntities)
	const gameSystem = new GameSystem(maxEntities, this)
	this.systems = [
		gameSystem,
		physicsSystem,
    new GraphicSystem(maxEntities, physicsSystem, canvas, gameSystem)
	]
}

EntityManager.SYSTEM_TYPES = {
	GAME: 0,
	PHYSICS: 1,
  GRAPHICS: 2
}

EntityManager.prototype.createEntity = function(systemIds) {
	// Search the next available entity.
	for (let i = 0; i < this.actives.length; i++) {
		const nextEntityId = (this.lastEntityId+i) % this.actives.length
		if (this.actives[nextEntityId]) continue;
		this.lastEntityId = nextEntityId
		this.actives[this.lastEntityId] = true
		systemIds.forEach(systemId =>
			this.systems[systemId].createComponent(this.lastEntityId)
		)
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

EntityManager.prototype.getActiveCount = function() {
  return this.activeCount
}
