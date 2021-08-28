"use strict"

/*******************************************************************************
 * TinyPlaneEntity
 ******************************************************************************/

const TINY_PLANE_POP_TIME_SECOND = 0.5
const TINY_PLANE_IMAGE_PATH = 'images/Reisen.png'
const TINY_PLANE_POP_Y = 2
const TINY_PLANE_POP_X_FORBIDDEN_RANGE = 4

function TinyPlaneEntity() {}

TinyPlaneEntity.create = function(entityManager, playerEntityId, image) {
  const entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, entityManager)
  componentFactory.createTinyShipComponent(playerEntityId, image)
  return entityId
}

function TinyPlanePopper(entityManager, playerEntityId, images) {
  this.entityManager = entityManager
  this.playerEntityId = playerEntityId
  this.timeAccumulator = 0
  this.image = images.get(TINY_PLANE_IMAGE_PATH)
}

TinyPlanePopper.prototype.update = function(elapsedTimeSecond) {
  this.timeAccumulator += elapsedTimeSecond
  if (this.timeAccumulator >= TINY_PLANE_POP_TIME_SECOND) {
    const entityId = TinyPlaneEntity.create(this.entityManager, this.playerEntityId, this.image)
    const popPosition = new Vector2D(
      (Math.random() - 0.5 >= 0 )
        ? TINY_PLANE_POP_X_FORBIDDEN_RANGE
        : -TINY_PLANE_POP_X_FORBIDDEN_RANGE,
      TINY_PLANE_POP_Y
    )
    this.entityManager.getPhysicsSystem().setPosition(entityId, popPosition)
    this.timeAccumulator -= TINY_PLANE_POP_TIME_SECOND
  }
}
