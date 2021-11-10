/*******************************************************************************
 * ComponentFactory
 *
 * This file give simpler, standardized functions to create and register
 * components.
 ******************************************************************************/

import {BattalionComponent} from '../components/BattalionComponent.js'
import {MachineGunComponent} from '../components/MachineGunComponent.js'
import {ExplosionComponent} from '../components/ExplosionComponent.js'
import {ControlComponent} from '../components/ControlComponent.js'
import {FollowControlComponent} from '../components/FollowControlComponent.js'
import {PlayerComponent} from '../components/PlayerComponent.js'
import {
  GAME_COMPONENT_ID_CONTROL,
  GAME_COMPONENT_ID_DEACTIVATION_TIMER,
  GAME_COMPONENT_ID_LIFE,
  GAME_COMPONENT_ID_FADEOUT,
  GAME_COMPONENT_ID_DISK_ENTITY,
  GAME_COMPONENT_ID_RECTANGLE,
  GAME_COMPONENT_ID_BATTALION,
  GAME_COMPONENT_ID_MACHINE_GUN,
  GAME_COMPONENT_ID_DEATH_COMPONENT,
  GAME_COMPONENT_ID_PLAYER_COMPONENT,
  GAME_COMPONENT_ID_PARTICLE_COMPONENT,
} from '../game/GameSystem.js'


export function ComponentFactory(entityId, entityManager) {
  this.entityId = entityId
  this.entityManager = entityManager
}

ComponentFactory.prototype.createControlComponent = function() {
  const controlComponent = new ControlComponent(this.entityId, this.entityManager)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_CONTROL,
    controlComponent
  )
  return controlComponent
}

ComponentFactory.prototype.createFollowControlComponent = function(targetEntityId, image) {
  const tinyPlaneComponent = new FollowControlComponent(this.entityId, this.entityManager, targetEntityId, image)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_CONTROL,
    tinyPlaneComponent
  )
  return tinyPlaneComponent
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
  const battalionComponent = new BattalionComponent(battalionId, damage)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_BATTALION,
    battalionComponent
  )
  return battalionComponent
}

ComponentFactory.prototype.createMachineGunComponent = function(images, damage, battalionId) {
  const component = new MachineGunComponent(this.entityManager, images, damage, battalionId)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_MACHINE_GUN,
    component
  )
  return component
}

ComponentFactory.prototype.createExplosionComponent = function(images, scale) {
  const component = new ExplosionComponent(this.entityManager, images, scale)
  this.entityManager.getGameSystem().addComponent(
    this.entityId,
    GAME_COMPONENT_ID_DEATH_COMPONENT,
    component
  )
  return component
}

ComponentFactory.prototype.createPlayerComponent = function(entityManager, particleSystem) {
  const component = new PlayerComponent(entityManager, particleSystem)
  this.entityManager.getGameSystem().addComponent(
    this.entityId, 
    GAME_COMPONENT_ID_PLAYER_COMPONENT,
    component
  )
  return component
}
