/*******************************************************************************
 * PhysicEntity
 ******************************************************************************/

export function PhysicEntity(entityId, physicsSystem) {
  this.entityId = entityId
  this.physicsSystem = physicsSystem
}

PhysicEntity.createFactory = physicsSystem => entityId =>
  new PhysicEntity(entityId, physicsSystem)

PhysicEntity.prototype.setPosition = function(position) {
  this.physicsSystem.setPosition(this.entityId, position)
}

PhysicEntity.prototype.getPosition = function() {
  return this.physicsSystem.getPosition(this.entityId)
}

PhysicEntity.prototype.setVelocity = function(velocity) {
  this.physicsSystem.setVelocity(this.entityId, velocity)
}

PhysicEntity.prototype.getVelocity = function() {
  return this.physicsSystem.getVelocity(this.entityId)
}

PhysicEntity.prototype.setDirection = function(direction) {
  this.physicsSystem.setDirection(this.entityId, direction)
}

PhysicEntity.prototype.getDirection = function() {
  return this.physicsSystem.getDirection(this.entityId)
}

PhysicEntity.prototype.setAcceleration = function(acceleration) {
  this.physicsSystem.setAcceleration(this.entityId, acceleration)
}

PhysicEntity.prototype.getAcceleration = function() {
  return this.physicsSystem.getAcceleration(this.entityId)
}
