"use strict"

/********************************************************************************
* EntityManager manages the lifecycle of all entities in the game.
********************************************************************************/

function EntityManager(canvas) {
	const maxEntities = 1000

	this.actives = []
	for (let i = 0; i < maxEntities; i++) {
		this.actives[i] = false
	}
	this.lastEntityId = 0
  const physicsSystem = new PhysicsSystem(maxEntities)
	this.systems = [
		physicsSystem,
    new GraphicSystem(maxEntities, physicsSystem, canvas)
	]
}

EntityManager.SYSTEM_TYPES = {
	PHYSICS: 0,
  GRAPHICS: 1
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
		return this.lastEntityId	
	}
	console.log('Failed to create entity. Max number of entity reached.')
	return -1 // Max entity number reached.
}

EntityManager.prototype.deleteEntity = function(entityId) {
	this.actives[entityId] = false
	this.systems.forEach(x => x.deleteComponent(x))
}

EntityManager.prototype.update = function(elapsedTimeSecond) {
	this.systems.forEach(x => x.update(elapsedTimeSecond))
}

EntityManager.prototype.getSystem = function(systemId) {
	return this.systems[systemId]
}

EntityManager.prototype.getPhysicsSystem = function() {
	return this.systems[EntityManager.SYSTEM_TYPES.PHYSICS]
}

EntityManager.prototype.getGraphicSystem = function() {
  return this.systems[EntityManager.SYSTEM_TYPES.GRAPHICS]
}
