"use strict"

Blaster.FIRE_INTERVAL = 0.3 // Time between bullets in seconds.

function Blaster(getInputData, createProjectile, physicsSystem, playerEntityId) {
  this.getInputData = getInputData
  this.cooldown = Blaster.FIRE_INTERVAL
  this.createProjectile = createProjectile
  this.physicsSystem = physicsSystem
  this.playerEntityId = playerEntityId
}

Blaster.prototype.update = function(elapsedTimeSecond) {
  this.cooldown = Math.max(0, this.cooldown - elapsedTimeSecond)

	const inputData = this.getInputData()
  if (!inputData.fire) {
    return
  }

  if (this.cooldown > 0) return
  this.cooldown = Blaster.FIRE_INTERVAL

  // Fire a bullet and reset the timer.
  this.timer = this.timer % Blaster.FIRE_INTERVAL
  const playerComponent = this.physicsSystem.getComponent(this.playerEntityId)
  const entityId = this.createProjectile() 
  const component = this.physicsSystem.getComponent(entityId)
  component.direction = playerComponent.direction
  component.position = playerComponent.position
  component.velocity = new Vector2D(BulletEntity.SPEED, 0)
    .rotate(playerComponent.direction)
    .add(playerComponent.velocity)

  // Prevent the bullet to lose too much speed.
  const distance = component.velocity.distance()
  if (distance < BulletEntity.SPEED && distance > 0.0001) {
    component.velocity = component.velocity
      .scalarMultiply(BulletEntity.SPEED / distance)
  }
}
