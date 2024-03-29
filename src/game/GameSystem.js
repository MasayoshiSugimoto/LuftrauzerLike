/********************************************************************************
* GameSystem manages game updates. Client code is free to add the component it
* likes.
********************************************************************************/

export const GAME_COMPONENT_ID_CONTROL = 0
export const GAME_COMPONENT_ID_DEACTIVATION_TIMER = 1
export const GAME_COMPONENT_ID_LIFE = 2
export const GAME_COMPONENT_ID_FADEOUT = 3
export const GAME_COMPONENT_ID_DISK_ENTITY = 4
export const GAME_COMPONENT_ID_RECTANGLE = 5
export const GAME_COMPONENT_ID_BATTALION = 6
export const GAME_COMPONENT_ID_MACHINE_GUN = 7
export const GAME_COMPONENT_ID_DEATH_COMPONENT = 8
export const GAME_COMPONENT_ID_PLAYER_COMPONENT = 9
export const GAME_COMPONENT_ID_PARTICLE_COMPONENT = 10
export const GAME_COMPONENT_ID_FOLLOW_MOUSE_COMPONENT = 11
export const GAME_COMPONENT_ID_CAMERA = 12
const GAME_COMPONENT_ID_MAX = 13


export function GameSystem(maxEntities) {
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
