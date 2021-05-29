"use strict";

/*******************************************************************************
 * Player Ship
 ******************************************************************************/

PlayerShip.ROTATION_UNIT = Math.PI * 2; // Rotation allowed per second.
PlayerShip.BOOST_UNIT = 10 // Velocity in meter/s^2.
PlayerShip.IMAGE_PATHS = [
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
PlayerShip.TOP_VIEW_INDEX = 15
PlayerShip.MAX_VELOCITY = 4
PlayerShip.MAX_HP = 100

function PlayerShip(entityId, entityManager, images, blaster) {
	const controlSystem = new ControlSystem(entityManager.getPhysicsSystem(), entityId)

  this.physicEntity = new PhysicEntity(
    entityId,
    entityManager.getPhysicsSystem()
  )
  this.images = PlayerShip.IMAGE_PATHS.map(path => images.get(path))
  this.entityManager = entityManager
  this.entityId = entityId
  this.angle = 0
  this.blaster = new Blaster(
		() => controlSystem.getInputData(),
		Projectile.createFactory(entityManager, images),
		entityManager.getPhysicsSystem(),
		entityId
	)

	// Initialize game components.
	entityManager.getGameSystem().addComponent(
		entityId,
		GAME_COMPONENT_ID_CONTROL,
		controlSystem
	)
	entityManager.getGameSystem().addComponent(
		entityId,
		GAME_COMPONENT_ID_LIFE,
		new LifeComponent(PlayerShip.MAX_HP, entityManager)
	)

	// Initialize physics component.
	const physicsComponent = entityManager.getPhysicsSystem().getComponent(entityId)
	physicsComponent.maxVelocity = PlayerShip.MAX_VELOCITY
	physicsComponent.gravity = true
	physicsComponent.vectorFieldIndices = [0, 1]

	// Initialize with an image.
	this.graphicSystem = entityManager.getGraphicSystem()
  this.graphicSystem.setupImage(this.entityId, this.images[PlayerShip.TOP_VIEW_INDEX])
}

PlayerShip.prototype.update = function(elapsedTimeSecond) {
  // Update physics based on user inputs.
  let direction = this.physicEntity.getDirection()
	const controlComponent = this.entityManager.getGameSystem().getComponent(this.entityId, GAME_COMPONENT_ID_CONTROL)
	controlComponent.update(this.entityId, elapsedTimeSecond)
	const inputData = controlComponent.getInputData()
  if (inputData.left) {
    direction -= PlayerShip.ROTATION_UNIT * elapsedTimeSecond
  } else if (inputData.right) {
    direction += PlayerShip.ROTATION_UNIT * elapsedTimeSecond
  }
  direction = Angle.normalize2PI(direction)
  this.physicEntity.setDirection(direction)

  let boost = 0
  if (inputData.boost) {
    boost = PlayerShip.BOOST_UNIT
  }
  this.physicEntity.setAcceleration(new Vector2D(boost, 0).rotate(direction))

  // Update blaster.
  this.blaster.update(elapsedTimeSecond)
}
