"use strict"

/********************************************************************************
* CollisionSystem.
********************************************************************************/

function CollisionSystem(maxEntities) {
	this.components = []

	for (let i = 0; i < maxEntities; i++) {
		this.components[i] = undefined
	}
}

CollisionSystem.prototype.update = function(elapsedTimeSecond) {
	
}

CollisionSystem.prototype.createComponent = function(entityId) {
}

CollisionSystem.prototype.deleteComponent = function(entityId) {
}

CollisionSystem.prototype.getComponent = function(entityId) {
}

