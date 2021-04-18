"use strict";

const Bullet = {

  create: function({
    position = Vector2D.zero(),
    direction = 0,
    entityManager
  }) {
    let state = {
      className  :  "bullet",
    }

    const entityId = entityManager.createEntity([
      EntityManager.SYSTEM_TYPES.PHYSICS
    ])
    const physicsSystem = entityManager
      .getSystem(EntityManager.SYSTEM_TYPES.PHYSICS)
    physicsSystem
      .setupComponent(entityId, {
        position: position,
        velocity: Bullet.angleToVector(direction)
      })
    const component = physicsSystem.getComponent(entityId)

    const bullet = Object.assign(
      state,
      this.proto,
      Disposable(state)
    )

    bullet.entityManager = entityManager
    bullet.entityId = entityId

    return bullet
  },

  proto: {

    updatePosition(elapsedTimeSecond) {
      this.entityManager
        .getPhysicsSystem()
        .getComponent(this.entityId)
        .position
      return this;
    },

    update(elapsedTimeSecond) {
      this.updatePosition(elapsedTimeSecond);
      return this;
    },

    collide() {
      return this;
    },

    isDead() {
      return false;
    },

    getRadius() {
      return 0.3;
    },

    setPosition(position) {
      this.getPhysicsSystem()
        .setPosition(this.entityId, position)
    },

    getPosition() {
      return this.getPhysicsSystem()
        .getComponent(this.entityId)
        .position
    },

    setDirection(direction) {
      this.getPhysicsSystem()
        .setVelocity(this.entityId, Bullet.angleToVector(direction))
    },

    getDirection() {
      return this.getPhysicsSystem()
        .getComponent(this.entityId)
        .velocity
        .getAngle()
    },

    getPhysicsSystem() {
      return this.entityManager.getPhysicsSystem()
    }
  }
};

Bullet.angleToVector = function(direction) {
  const bulletVelocityMeterPerSecond = 6.0
  return Vector2D
    .unitX()
    .rotate(direction)
    .scalarMultiply(bulletVelocityMeterPerSecond)
}
