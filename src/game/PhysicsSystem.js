"use strict";

/********************************************************************************
* PhysicsSystem apply gravity and update velocity of game entities.
********************************************************************************/

function PhysicsSystem(maxEntities) {
	this.actives = []
	this.components = []
	this.lastEntityId = 0

	for (let i = 0; i < maxEntities; i++) {
		this.actives[i] = false
		this.components.push({
			position: Vector2D.zero(),
			direction: Angle.zero(),
			velocity: Vector2D.zero(),
			gravity: false, // Apply gravity if true.
		})
	}
}

PhysicsSystem.prototype.update = function(elapsedTimeSecond) {
	// Apply constant velocity to all entities.
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return
		const position = component.position
		const velocity = component.velocity

		component.position = position.add(
			velocity.scalarMultiply(elapsedTimeSecond)
		)
  })
}

PhysicsSystem.prototype.createComponent = function(entityId) {
	this.actives[entityId] = true
	PhysicsSystem.initComponent(this.components[entityId])
}

PhysicsSystem.prototype.deleteComponent = function(entityId) {
	this.actives[entityId] = false
}

PhysicsSystem.initComponent = function(component) {
	component.position = Vector2D.zero()
	component.direction = Angle.zero()
	component.velocity = Vector2D.zero()
	component.gravity = false
}

PhysicsSystem.prototype.setupComponent = function(entityId, component) {
	Object.assign(this.components[entityId], component)
}

PhysicsSystem.prototype.getComponent = function(entityId) {
	return Object.assign(this.components[entityId])
}

PhysicsSystem.prototype.setPosition = function(entityId, position) {
	this.components[entityId].position = position
}

PhysicsSystem.prototype.getPosition = function(entityId) {
  return this.components[entityId].position
}

PhysicsSystem.prototype.setVelocity = function(entityId, velocity) {
	this.components[entityId].velocity = velocity
}

PhysicsSystem.prototype.isActive = function(entityId) {
  return this.actives[entityId]
}
