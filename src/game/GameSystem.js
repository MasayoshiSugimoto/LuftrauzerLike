"use strict"

/********************************************************************************
* GameSystem manages game updates. Client code is free to add the component it
* likes.
********************************************************************************/

const GAME_COMPONENT_ID_CONTROL = 0
const GAME_COMPONENT_ID_TINY_SHIP = 1
const GAME_COMPONENT_ID_DEACTIVATION_TIMER = 2
const GAME_COMPONENT_ID_LIFE = 3
const GAME_COMPONENT_ID_FADEOUT = 4
const GAME_COMPONENT_ID_DISK_ENTITY = 5
const GAME_COMPONENT_ID_RECTANGLE = 6
const GAME_COMPONENT_ID_MAX = 7

const GAME_SYSTEM_CELL_INTERVAL = 0.1

function GameSystem(maxEntities, entityManager) {
	this.components = []
	for (let i = 0; i < maxEntities; i++) {
		this.components[i] = undefined
	}

  this.map2D = new HashMap2D(
    -GAME_SPACE_WIDTH_METER/2,
    SEA_Y_COORDINATE_METER,
    GAME_SPACE_WIDTH_METER,
    SKY_Y_COORDINATE_METER - SEA_Y_COORDINATE_METER,
    GAME_SYSTEM_CELL_INTERVAL
  )

  this.entityManager = entityManager
}

GameSystem.prototype.update = function(elapsedTimeSecond) {
  const physicsSystem = this.entityManager.getPhysicsSystem()
	for (let entityId = 0; entityId < this.components.length; entityId++) {
		const components = this.components[entityId]
		if (!components) continue
		for (let componentId = 0; componentId < GAME_COMPONENT_ID_MAX; componentId++) {
			if (!components[componentId]) continue
			components[componentId].update(entityId, elapsedTimeSecond)
		}

    // Update 2D map with entity.
    const physicComponent = physicsSystem.getComponent(entityId)
    const size = physicComponent.size
    this.map2D.updateEntity(entityId, physicComponent.position, Math.max(size.x, size.y))
	}
}

GameSystem.prototype.createComponent = function(entityId) {
	const components = new Array(GAME_COMPONENT_ID_MAX)
	this.components[entityId] = components
	for (let i = 0; i < GAME_COMPONENT_ID_MAX; i++) {
		components[i] = undefined
	}

  const physicComponent = this.entityManager.getPhysicsSystem().getComponent(entityId)
  const size = physicComponent.size
  this.map2D.addEntity(entityId, physicComponent.position, Math.max(size.x, size.y))
}

GameSystem.prototype.deleteComponent = function(entityId) {
	this.components[entityId] = undefined
  this.map2D.removeEntity(entityId)
}

GameSystem.prototype.addComponent = function(entityId, componentId, component) {
	this.components[entityId][componentId] = component
}

GameSystem.prototype.removeComponent = function(entityId, componentId) {
	this.components[entityId][componentId] = undefined
}

GameSystem.prototype.getComponent = function(entityId, componentId) {
	if (!this.components[entityId]) return undefined
	return this.components[entityId][componentId]
}
