"use strict"

/********************************************************************************
* HashMap2D. Data structure to quickly query entities from coordinates.
********************************************************************************/

function HashMap2D(x, y, height, width, cellInterval) {
	this.x = x
	this.y = y
	this.height = height
	this.width = width
	this.cellInterval = cellInterval

	// We need a map [entityId, {position, radius}].
	this.entityMap = new Map()
	// Cells containing a list of entities
	this.cells = new Map()
}

HashMap2D.prototype.addEntity = function(entityId, position, radius) {
	const left = Math.floor((position.x - radius) / this.cellInterval) - this.x
	const right = Math.floor((position.x + radius) / this.cellInterval) - this.x
	const top = Math.floor((position.y + radius) / this.cellInterval) - this.y
	const bottom = Math.floor((position.y - radius) / this.cellInterval) - this.y

	this.entityMap.set(entityId, { position, radius })
	for (let i = this.toCellX(position.x); i <= this.toCellX(position.x + radius); i++) {
		for (let j = this.toCellY(position.y); j <= this.toCellY(position.y + radius); j++) {
			const key = `${i}.${j}`
			let cell = this.cells.get(key)	
			if (!cell) {
				cell = []
				this.cells.set(key, cell)
			}
			cell.push(entityId)
		}
	}
}

HashMap2D.prototype.updateEntity = function(entityId, position, radius) {
	this.removeEntity(entityId);
	this.addEntity(entityId, position, radius)
}

HashMap2D.prototype.removeEntity = function(entityId) {
	const entityInfo = this.entityMap.get(entityId)
	if (!entityInfo) return

	const position = entityInfo.position
	const radius = entityInfo.radius
	for (let i = this.toCellX(position.x); i <= this.toCellX(position.x + radius); i++) {
		for (let j = this.toCellY(position.y); j <= this.toCellY(position.y + radius); j++) {
			const cell = this.cells.get(`${i}.${j}`)
			if (!cell) continue
			cell.remove(entityId)	
		}
	}
}

HashMap2D.prototype.searchEntities = function(x, y, width, height) {
	const set = new Set()
	for (let i = this.toCellX(x); i <= this.toCellX(x+width); i++) {
		for (let j = this.toCellY(y); j <= this.toCellY(y+height); j++) {
			const cell = this.cells.get(`${i}.${j}`)
			if (!cell) continue
			cell.forEach(entityId => set.add(entityId))
		}
	}
	return [...set]
}

HashMap2D.prototype.toCellX = function(x) {
	return Math.floor((x - this.x) / this.cellInterval)
}

HashMap2D.prototype.toCellY = function(y) {
	return Math.floor((y - this.y) / this.cellInterval)
}
