"use strict"

/********************************************************************************
* GameSystem manages game updates. Client code is free to add the component it
* likes.
********************************************************************************/

const GAME_COMPONENT_ID_CONTROL = 0
const GAME_COMPONENT_ID_DEACTIVATION_TIMER = 1
const GAME_COMPONENT_ID_LIFE = 2
const GAME_COMPONENT_ID_FADEOUT = 3
const GAME_COMPONENT_ID_DISK_ENTITY = 4
const GAME_COMPONENT_ID_RECTANGLE = 5
const GAME_COMPONENT_ID_BATTALION = 6
const GAME_COMPONENT_ID_MACHINE_GUN = 7
const GAME_COMPONENT_ID_DEATH_COMPONENT = 8
const GAME_COMPONENT_ID_MAX = 9

function GameSystem(maxEntities) {
	this.components = []
	for (let i = 0; i < maxEntities; i++) {
		this.components[i] = undefined
	}
}

GameSystem.prototype.update = function(elapsedTimeSecond) {
	for (let entityId = 0; entityId < this.components.length; entityId++) {
		const components = this.components[entityId]
		if (!components) continue
		for (let componentId = 0; componentId < GAME_COMPONENT_ID_MAX; componentId++) {
			if (!components[componentId]) continue
			components[componentId].update(entityId, elapsedTimeSecond)
		}
	}
}

GameSystem.prototype.createComponent = function(entityId) {
	const components = new Array(GAME_COMPONENT_ID_MAX)
	this.components[entityId] = components
	for (let i = 0; i < GAME_COMPONENT_ID_MAX; i++) {
		components[i] = undefined
	}
}

GameSystem.prototype.deleteComponent = function(entityId) {
	this.components[entityId] = undefined
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
