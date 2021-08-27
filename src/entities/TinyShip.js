"use strict"

/*******************************************************************************
 * TinyShipPopper
 ******************************************************************************/

const TINY_SHIP_POP_TIME_SECOND = 0.5
const TINY_SHIP_IMAGE_PATH = 'images/Reisen.png'
const TINY_SHIP_POP_Y = 2
const TINY_SHIP_POP_X_FORBIDDEN_RANGE = 4

function TinyShipPopper(entityManager, playerEntityId, images) {
  this.entityManager = entityManager
  this.playerEntityId = playerEntityId
  this.timeAccumulator = 0
  this.image = images.get(TINY_SHIP_IMAGE_PATH)
}

TinyShipPopper.prototype.update = function(elapsedTimeSecond) {
  this.timeAccumulator += elapsedTimeSecond
  if (this.timeAccumulator >= TINY_SHIP_POP_TIME_SECOND) {
    const tinyShip = this.createTinyShip()
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

TinyShipPopper.prototype.createTinyShip = function() {
  const entityId = this.entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, this.entityManager)
  return componentFactory.createTinyShipComponent(this.playerEntityId, this.image)
}
