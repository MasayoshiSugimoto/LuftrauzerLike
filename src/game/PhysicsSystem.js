"use strict";

/********************************************************************************
* PhysicsSystem apply gravity and update velocity of game entities.
********************************************************************************/

PhysicsSystem.GRAVITY_VECTOR = new Vector2D(0, -2)
PhysicsSystem.MAX_VELOCITY = 8; // Meter/Second

function PhysicsSystem(maxEntities) {
	this.actives = []
	this.components = []

	for (let i = 0; i < maxEntities; i++) {
		this.actives[i] = false
    const component = {}
    PhysicsSystem.initComponent(component)
		this.components.push(component)
	}
}

PhysicsSystem.prototype.update = function(elapsedTimeSecond) {
	// Apply constant velocity to all entities.
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return
		const position = component.position

    // Update gravity.
    if (component.gravity) {
      component.acceleration = component.acceleration
        .add(PhysicsSystem.GRAVITY_VECTOR)
    }

    // Update velocity.
    component.velocity = component.velocity
      .add(component.acceleration.scalarMultiply(elapsedTimeSecond))
      .cut(component.maxVelocity)

    // Update position.
    component.position = position.add(
      component.velocity.scalarMultiply(elapsedTimeSecond)
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
	component.direction = 0
	component.velocity = Vector2D.zero()
	component.gravity = false
  component.acceleration = Vector2D.zero()
	component.maxVelocity = PhysicsSystem.MAX_VELOCITY
}

PhysicsSystem.prototype.setupComponent = function(entityId, component) {
	Object.assign(this.components[entityId], component)
}

PhysicsSystem.prototype.getComponent = function(entityId) {
	return this.components[entityId]
}

PhysicsSystem.prototype.setPosition = function(entityId, position) {
	this.components[entityId].position = position
}

PhysicsSystem.prototype.getPosition = function(entityId) {
  return this.components[entityId].position
}

PhysicsSystem.prototype.getVelocity = function(entityId) {
  return this.components[entityId].velocity
}

PhysicsSystem.prototype.setVelocity = function(entityId, velocity) {
	this.components[entityId].velocity = velocity
}

PhysicsSystem.prototype.setDirection = function(entityId, direction) {
  this.components[entityId].direction = direction
}

PhysicsSystem.prototype.getDirection = function(entityId) {
  return this.components[entityId].direction
}

PhysicsSystem.prototype.setAcceleration = function(entityId, acceleration) {
  this.components[entityId].acceleration = acceleration
}

PhysicsSystem.prototype.getAcceleration = function(entityId) {
  return this.components[entityId].acceleration
}

PhysicsSystem.prototype.isActive = function(entityId) {
  return this.actives[entityId]
}