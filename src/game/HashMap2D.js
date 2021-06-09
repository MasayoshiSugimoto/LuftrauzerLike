"use strict"

/********************************************************************************
* HashMap2D. Data structure to quickly query entities from coordinates.
********************************************************************************/

function HashMap2D(x, y, width, height, cellInterval) {
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.cellInterval = cellInterval

	// We need a map [entityId, {position, radius}].
	this.entityMap = new Map()
	// Cells containing a list of entities
	this.cells = new Map()
}

HashMap2D.prototype.addEntity = function(entityId, position, radius) {
	this.entityMap.set(entityId, { position, radius })
	for (let i = this.toCellX(position.x); i <= this.toCellX(position.x + radius)+1; i++) {
		for (let j = this.toCellY(position.y); j <= this.toCellY(position.y + radius)+1; j++) {
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
	for (let i = this.toCellX(position.x); i <= this.toCellX(position.x + radius)+1; i++) {
		for (let j = this.toCellY(position.y); j <= this.toCellY(position.y + radius)+1; j++) {
			const cell = this.cells.get(`${i}.${j}`)
			if (!cell) continue
      this.remove(cell, entityId)
		}
	}
}

HashMap2D.prototype.searchEntities = function(x, y, width, height) {
	const set = new Set()
	for (let i = this.toCellX(x); i <= this.toCellX(x+width)+1; i++) {
		for (let j = this.toCellY(y); j <= this.toCellY(y+height)+1; j++) {
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

HashMap2D.prototype.remove = function(array, entityId) {
  if (array.length === 0) return
  if (array.length > 1 && array[array.length-1] !== entityId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === entityId) {
        array[i] = array[array.length - 1]
        array.pop()
        return
      }
    }
  } else {
    array.pop() 
  }
}
