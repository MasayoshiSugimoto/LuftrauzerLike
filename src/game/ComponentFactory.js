"use strict"

/*******************************************************************************
 * ComponentFactory
 *
 * This file give simpler, standardized functions to create and register
 * components.
 ******************************************************************************/

function ComponentFactory(entityId, entityManager) {
  this.entityId = entityId
  this.entityManager = entityManager
}

ComponentFactory.prototype.createControlComponent = function() {
  const controlComponent = new ControlComponent(this.entityManager.getPhysicsSystem(), this.entityId)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_CONTROL,
    controlComponent
  )
  return controlComponent
}

ComponentFactory.prototype.createTinyShipComponent = function(targetEntityId, image) {
  const tinyShipComponent = new TinyShipComponent(this.entityId, this.entityManager, targetEntityId, image)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_TINY_SHIP,
    tinyShipComponent
  )
  return tinyShipComponent
}

ComponentFactory.prototype.createDeactivationTimerComponent = function(timeToDeactivateSecond) {
  const deactivationTimerComponent = new DeactivationTimerComponent(timeToDeactivateSecond, this.entityManager)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_DEACTIVATION_TIMER,
    deactivationTimerComponent
  )
  return deactivationTimerComponent
}

ComponentFactory.prototype.createLifeComponent = function(lifeMax) {
  const lifeComponent = new LifeComponent(lifeMax, this.entityManager)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_LIFE,
    lifeComponent
  )
  return lifeComponent
}

ComponentFactory.prototype.createFadeoutComponent = function(explosionImage, fadeOutTimeSecond) {
  const fadeoutComponent = new FadeoutComponent(
    this.entityId,
    explosionImage,
    fadeOutTimeSecond,
    this.entityManager.getGraphicSystem()
  )
  this.entityManager.getGameSystem().addComponent(this.entityId, GAME_COMPONENT_ID_FADEOUT, fadeoutComponent)
  return fadeoutComponent
}

ComponentFactory.prototype.createDiscComponent = function() {
  const discComponent = new DiscComponent(this.entityId, this.entityManager)
  this.entityManager.getGameSystem().addComponent(this.entityId, GAME_COMPONENT_ID_DISK_ENTITY, discComponent)
  return discComponent
}

ComponentFactory.prototype.createRectangleComponent = function(playerEntityId, width, height) {
  const rectangleComponent = new RectangleComponent(this.entityId, this.entityManager, playerEntityId, width, height)
  this.entityManager.getGameSystem().addComponent(this.entityId, GAME_COMPONENT_ID_RECTANGLE, rectangleComponent)
  return rectangleComponent
}

ComponentFactory.prototype.createBattalionComponent = function(battalionId, damage) {
  let battalionComponent = new BattalionComponent(battalionId, damage)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_BATTALION,
    battalionComponent
  )
  return battalionComponent
}