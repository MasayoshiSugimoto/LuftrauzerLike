"use strict"

/********************************************************************************
* PhysicsSystem apply gravity and update velocity of game entities.
********************************************************************************/

PhysicsSystem.GRAVITY = -4 // Meter/Second
PhysicsSystem.GRAVITY_VECTOR = new Vector2D(0, PhysicsSystem.GRAVITY)
PhysicsSystem.MAX_VELOCITY = 10 // Meter/Second
PhysicsSystem.VECTOR_FIELD_ACCELERATION = 10 // Meter/Second

function PhysicsSystem(maxEntities) {
  this.playerEntityId = -1

	this.actives = []
	this.components = []
	for (let i = 0; i < maxEntities; i++) {
		this.actives[i] = false
    const component = {}
    PhysicsSystem.initComponent(component)
		this.components.push(component)
	}

	// Sky and Sea vector fields.
	this.vectorFields = new Array(VECTOR_FIELD_ID_MAX)
	this.vectorFields[VECTOR_FIELD_ID_SEA] = new YVectorField(
		SEA_Y_COORDINATE_METER,
		-Infinity,
		new Vector2D(0, PhysicsSystem.VECTOR_FIELD_ACCELERATION)
	)
	this.vectorFields[VECTOR_FIELD_ID_SKY] = new YVectorField(
		SKY_Y_COORDINATE_METER,
		+Infinity,
		new Vector2D(0, -PhysicsSystem.VECTOR_FIELD_ACCELERATION)
	)
}

PhysicsSystem.prototype.update = function(elapsedTimeSecond) {
	// Apply constant velocity to all entities.
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return
		const position = component.position

    // Update gravity.
		let acceleration = component.acceleration
    if (component.gravity) {
      acceleration = acceleration.add(PhysicsSystem.GRAVITY_VECTOR)
    }

		// Update vector fields.
		component.vectorFieldIndices.forEach(i => {
			acceleration = acceleration.add(this.vectorFields[i].getAcceleration(component))
		})

    // Update velocity.
    if (component.velocityUpdate) {
      component.velocity = component.velocity
        .add(acceleration.scalarMultiply(elapsedTimeSecond))
        .cut(component.maxVelocity)
    }

    // Update position.
    component.position = position.add(
      component.velocity.scalarMultiply(elapsedTimeSecond)
    )
  })
  this.CylinderProjection()
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
  component.velocityUpdate = true
	component.vectorFieldIndices = []
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

/*
 * We project on a cylinder, center on the player, then project again on the
 * game space. This is done in order to have infinite scrolling on left and
 * right sides.
 */
PhysicsSystem.prototype.CylinderProjection = function() {
  // Still works without player entity id.
  if (this.playerEntityId < 0 || !this.actives[this.playerEntityId]) return 
  const playerX = this.components[this.playerEntityId].position.x
	const halfWidth = GAME_SPACE_WIDTH_METER / 2
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return
		const position = component.position
    let x = position.x
    x = (x - playerX) / halfWidth * Math.PI
    x = Angle.normalize(x)
    x = x / Math.PI * halfWidth
    position.x = x
  })
}

PhysicsSystem.prototype.setPlayerEntityId = function(playerEntityId) {
  this.playerEntityId = playerEntityId
}


/********************************************************************************
* Y Vector fields.
********************************************************************************/

function YVectorField(yStart, yEnd, acceleration) {
	const start = Math.min(yStart, yEnd)
	const end = Math.max(yStart, yEnd)
	this.yStart = start
	this.yEnd = end
	this.acceleration = acceleration
}

YVectorField.prototype.getAcceleration = function(component) {
	const y = component.position.y
	if (this.yStart <= y && y <= this.yEnd) {
		return this.acceleration
	}
	return Vector2D.ZERO
}

