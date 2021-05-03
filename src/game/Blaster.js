"use strict"

Blaster.FIRE_INTERVAL = 0.1 // Time between bullets in seconds.

function Blaster(userInput, createProjectile, physicsSystem, playerEntityId) {
  this.userInput = userInput
  this.timer = 0
  this.createProjectile = createProjectile
  this.physicsSystem = physicsSystem
  this.playerEntityId = playerEntityId
}

Blaster.prototype.update = function(elapsedTimeSecond) {
  if (!this.userInput.fire) {
    this.timer = 0
    console.log('Reset timer.')
    return
  }

  this.timer += elapsedTimeSecond
  if (this.timer < Blaster.FIRE_INTERVAL) return
  console.log('Fire.')

  // Fire a bullet and reset the timer.
  this.timer = this.timer % Blaster.FIRE_INTERVAL
  const playerComponent = this.physicsSystem.getComponent(this.playerEntityId)
  const entityId = this.createProjectile() 
  const component = this.physicsSystem.getComponent(entityId)
  component.direction = playerComponent.direction
  component.position = playerComponent.position
  component.velocity = new Vector2D(Projectile.SPEED, 0)
    .rotate(playerComponent.direction)
}

