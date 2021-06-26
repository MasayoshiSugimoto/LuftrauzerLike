"use strict"

const TINY_SHIP_MAX_ROTATION_RADIAN_PER_SECOND = Math.PI / 2
const TINY_SHIP_VELOCITY_METER_PER_SECOND = 1
const TINY_SHIP_FIRE_RATE = 2
const TINY_SHIP_POP_TIME_SECOND = 0.5
const TINY_SHIP_POP_DELTA_METER = 5
const TINY_SHIP_IMAGE_PATH = 'images/Reisen.png'
const TINY_SHIP_SCALE = 0.5
const TINY_SHIP_POP_Y = 2
const TINY_SHIP_POP_X_FORBIDDEN_RANGE = 4
const TINY_SHIP_DAMAGE = 10

function TinyShip(entityManager, targetEntityId, image) {
  this.physicsSystem = entityManager.getPhysicsSystem()
  this.targetEntityId = targetEntityId
  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])

  // Game system setup.
  const gameSystem = entityManager.getGameSystem()
  gameSystem.addComponent(
    this.entityId,
    GAME_COMPONENT_ID_TINY_SHIP,
    this
  )
  gameSystem.addComponent(
    this.entityId,
    GAME_COMPONENT_ID_BATTALION,
    BattalionComponent.createEnnemyComponent()
  )

  // Physics system setup.
  const physicsSystem = entityManager.getPhysicsSystem()
  physicsSystem.enableCollision(this.entityId)

  // Graphic system setup.
  const graphicSystem = entityManager.getGraphicSystem()
  graphicSystem.setupImage(this.entityId, image)
  graphicSystem.setScale(this.entityId, TINY_SHIP_SCALE)
}

TinyShip.prototype.update = function(entityId, elapsedTimeSecond) {
  const targetPosition = this.physicsSystem.getPosition(this.targetEntityId)
  if (!targetPosition) return
  const position = this.physicsSystem.getPosition(entityId)
  const targetVector = targetPosition.substract(position)

  // Don't do anything if we are very close to the target.
  const distance = targetVector.distance()
  if (distance <= EPSILON) return

  // Rotate in the direction of the target.
  const direction = this.physicsSystem.getDirection(entityId)
  let deltaDirection = Angle.normalize(targetVector.getAngle() - direction)
  const maxAngle = TINY_SHIP_MAX_ROTATION_RADIAN_PER_SECOND * elapsedTimeSecond
  if (deltaDirection > maxAngle) deltaDirection = maxAngle
  if (deltaDirection < -maxAngle) deltaDirection = -maxAngle

  const component = this.physicsSystem.getComponent(entityId)
  component.direction = Angle.normalize(direction + deltaDirection)
  component.velocity = Vector2D.X_ONE.rotate(component.direction)
  component.velocityUpdate = false
}

function TinyShipPopper(entityManager, playerEntityId, images) {
  this.entityManager = entityManager
  this.playerEntityId = playerEntityId
  this.timeAccumulator = 0
  this.image = images.get(TINY_SHIP_IMAGE_PATH)
}

TinyShipPopper.prototype.update = function(elapsedTimeSecond) {
  this.timeAccumulator += elapsedTimeSecond
  if (this.timeAccumulator >= TINY_SHIP_POP_TIME_SECOND) {
    const tinyShip = new TinyShip(
      this.entityManager,
      this.playerEntityId,
      this.image
    )
    const targetPosition = this.entityManager
      .getPhysicsSystem()
      .getPosition(tinyShip.entityId)
    this.entityManager.getPhysicsSystem()
      .setPosition(tinyShip.entityId, new Vector2D(
        (Math.random() - 0.5 >= 0 )
          ? TINY_SHIP_POP_X_FORBIDDEN_RANGE
          : -TINY_SHIP_POP_X_FORBIDDEN_RANGE,
        TINY_SHIP_POP_Y
      ))
    this.timeAccumulator -= TINY_SHIP_POP_TIME_SECOND
  }
}
