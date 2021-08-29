"use strict"

/*******************************************************************************
 * MachineGunComponent
 ******************************************************************************/

const MACHINE_GUN_COMPONENT_FIRE_INTERVAL = 0.3 // Time between bullets in seconds.
const MACHINE_GUN_COMPONENT_SPEED = 5 // Meter per second.

function MachineGunComponent(entityManager, images, damage, battalionId) {
  this.entityManager = entityManager
  this.cooldown = 0
  this.createBullet = BulletEntity.createFactory(entityManager, images)
  this.damage = damage
  this.battalionId = battalionId
}

MachineGunComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  const {
    gameSystem,
    physicsSystem,
    graphicSystem
  } = this.entityManager.getSystems()
  const controlComponent = gameSystem.getComponent(entityId, GAME_COMPONENT_ID_CONTROL)
  if (!controlComponent) return

  this.cooldown = Math.max(0, this.cooldown - elapsedTimeSecond)

  if (!controlComponent.getInputData().fire) return

  if (this.cooldown > 0) return
  // Reset cooldown.
  this.cooldown = MACHINE_GUN_COMPONENT_FIRE_INTERVAL
  const playerComponent = physicsSystem.getComponent(entityId)

  // Fire a bullet.
  const bulletEntityId = this.createBullet() 
  const component = physicsSystem.getComponent(bulletEntityId)
  component.direction = playerComponent.direction
  component.position = playerComponent.position
  component.velocity = new Vector2D(MACHINE_GUN_COMPONENT_SPEED, 0)
    .rotate(playerComponent.direction)
    .add(playerComponent.velocity)

  // Prevent the bullet to lose too much speed.
  const distance = component.velocity.distance()
  if (distance < MACHINE_GUN_COMPONENT_SPEED && distance > 0.0001) {
    component.velocity = component.velocity
      .scalarMultiply(MACHINE_GUN_COMPONENT_SPEED / distance)
  }

  const componentFactory = new ComponentFactory(bulletEntityId, this.entityManager)
  componentFactory.createBattalionComponent(this.battalionId, this.damage)
}
