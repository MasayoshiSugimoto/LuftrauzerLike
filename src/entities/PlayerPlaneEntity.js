/*******************************************************************************
 * PlayerPlaneEntity
 ******************************************************************************/

import {BATTALION_ID_PLAYER} from '../components/BattalionComponent.js'
import {enableHealthBar} from '../graphics/HealthBar.js'
import {ComponentFactory} from '../game/ComponentFactory.js'
import {enableCollisionCircle} from '../graphics/CollisionCircle.js'
import {Vector2D} from '../geometry/Vector2D.js'


PlayerPlaneEntity.ROTATION_UNIT = Math.PI * 2; // Rotation allowed per second.
PlayerPlaneEntity.BOOST_UNIT = 10 // Velocity in meter/s^2.
PlayerPlaneEntity.IMAGE_PATHS = [
  "images/Reisen15.png",
  "images/Reisen14.png",
  "images/Reisen13.png",
  "images/Reisen12.png",
  "images/Reisen11.png",
  "images/Reisen10.png",
  "images/Reisen9.png",
  "images/Reisen8.png",
  "images/Reisen7.png",
  "images/Reisen6.png",
  "images/Reisen5.png",
  "images/Reisen4.png",
  "images/Reisen3.png",
  "images/Reisen2.png",
  "images/Reisen2.png",
  "images/Reisen.png",
  "images/Reisen-1.png",
  "images/Reisen-2.png",
  "images/Reisen-3.png",
  "images/Reisen-4.png",
  "images/Reisen-5.png",
  "images/Reisen-6.png",
  "images/Reisen-7.png",
  "images/Reisen-8.png",
  "images/Reisen-9.png",
  "images/Reisen-10.png",
  "images/Reisen-11.png",
  "images/Reisen-12.png",
  "images/Reisen-13.png",
  "images/Reisen-14.png",
  "images/Reisen-15.png",
]
PlayerPlaneEntity.TOP_VIEW_INDEX = 15
PlayerPlaneEntity.MAX_VELOCITY = 4
PlayerPlaneEntity.MAX_HP = 100
PlayerPlaneEntity.FADEOUT_TIME_SECOND = 1
PlayerPlaneEntity.SCALE = 1
PlayerPlaneEntity.EXPLOSION_SCALE = 1
PlayerPlaneEntity.DAMAGE = 1

export function PlayerPlaneEntity() {}

PlayerPlaneEntity.create = function(entityId, entityManager, images, particleSystem) {
  const {
    gameSystem,
    physicsSystem,
    graphicSystem
  } = entityManager.getSystems()
  const componentFactory = new ComponentFactory(entityId, entityManager)
  const image = images.get(PlayerPlaneEntity.IMAGE_PATHS[PlayerPlaneEntity.TOP_VIEW_INDEX])

  // Initialize game components.
  componentFactory.createControlComponent()
  componentFactory.createMachineGunComponent(images, PlayerPlaneEntity.DAMAGE, BATTALION_ID_PLAYER)
  componentFactory.createLifeComponent(PlayerPlaneEntity.MAX_HP)
  componentFactory.createBattalionComponent(BATTALION_ID_PLAYER)
  componentFactory.createExplosionComponent(images, PlayerPlaneEntity.EXPLOSION_SCALE)
  componentFactory.createPlayerComponent(entityManager, particleSystem)

  const physicsComponent = physicsSystem.getComponent(entityId)
  physicsComponent.maxVelocity = PlayerPlaneEntity.MAX_VELOCITY
  physicsComponent.gravity = true
  physicsComponent.vectorFieldIndices = [0, 1]
  physicsComponent.collision = true
  physicsComponent.collisionSize = new Vector2D(0.1, 0.1)
  physicsSystem.setSizeFromImage(entityId, image, PlayerPlaneEntity.SCALE)

  // Initialize with an image.
  graphicSystem.setupImage(entityId, image)
  enableHealthBar(entityId, entityManager)
  enableCollisionCircle(entityId, entityManager)
}
