"use strict"

/*******************************************************************************
 * TinyPlaneEntity
 ******************************************************************************/

const TINY_PLANE_POP_TIME_SECOND = 0.5
const TINY_PLANE_IMAGE_PATH = 'images/Reisen.png'
const TINY_PLANE_POP_Y = 2
const TINY_PLANE_POP_X_FORBIDDEN_RANGE = 4
const TINY_PLANE_SCALE = 0.5
const TINY_PLANE_MAX_HP = 1

function TinyPlaneEntity() {}

TinyPlaneEntity.create = function(entityManager, playerEntityId, image, images) {
  const entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(entityId, entityManager)
  const gameSystem = entityManager.getGameSystem()

  // TODO: Revert and make it more configurable (scale, bullet color, speed, frequency...)
  // componentFactory.createMachineGunComponent(images)
  componentFactory.createFollowControlComponent(playerEntityId, image)
  componentFactory.createBattalionComponent(BATTALION_ID_ENNEMY)
  componentFactory.createLifeComponent(TINY_PLANE_MAX_HP)
  componentFactory.createExplosionComponent(images)

  // Physics system setup.
  const physicsSystem = entityManager.getPhysicsSystem()
  physicsSystem.enableCollision(entityId)

  // Graphic system setup.
  const graphicSystem = entityManager.getGraphicSystem()
  graphicSystem.setupImage(entityId, image)
  graphicSystem.setScale(entityId, TINY_PLANE_SCALE)

  return entityId
}

function TinyPlanePopper(entityManager, playerEntityId, images) {
  this.entityManager = entityManager
  this.playerEntityId = playerEntityId
  this.timeAccumulator = 0
  this.image = images.get(TINY_PLANE_IMAGE_PATH)
  this.images = images
}

TinyPlanePopper.prototype.update = function(elapsedTimeSecond) {
  this.timeAccumulator += elapsedTimeSecond
  if (this.timeAccumulator >= TINY_PLANE_POP_TIME_SECOND) {
    const entityId = TinyPlaneEntity.create(this.entityManager, this.playerEntityId, this.image, this.images)
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
