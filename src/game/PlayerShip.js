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
PlayerShip.FADEOUT_TIME_SECOND = 1
PlayerShip.EXPLOSION_IMAGE_PATH = 'images/Explosion.png'
PlayerShip.SCALE = 1

const PLAYER_STATE_ALIVE = 0
const PLAYER_STATE_DYING = 1

function PlayerShip(entityId, entityManager, images, blaster) {
	const controlSystem = new ControlSystem(entityManager.getPhysicsSystem(), entityId)

  this.physicEntity = new PhysicEntity(
    entityId,
    entityManager.getPhysicsSystem()
  )
  this.images = PlayerShip.IMAGE_PATHS.map(path => images.get(path))
  const image = this.images[PlayerShip.TOP_VIEW_INDEX]
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
	const gameSystem = entityManager.getGameSystem()
	gameSystem.addComponent(
		entityId,
		GAME_COMPONENT_ID_CONTROL,
		controlSystem
	)
	gameSystem.addComponent(
		entityId,
		GAME_COMPONENT_ID_LIFE,
		new LifeComponent(PlayerShip.MAX_HP, entityManager)
	)
	this.explosionImage = images.get(PlayerShip.EXPLOSION_IMAGE_PATH)

	// Initialize physics component.
	const physicsComponent = entityManager.getPhysicsSystem().getComponent(entityId)
	physicsComponent.maxVelocity = PlayerShip.MAX_VELOCITY
	//physicsComponent.gravity = true
	physicsComponent.vectorFieldIndices = [0, 1]
  entityManager.getPhysicsSystem().setSizeFromImage(entityId, image, PlayerShip.SCALE)

	// Initialize with an image.
	this.graphicSystem = entityManager.getGraphicSystem()
  this.graphicSystem.setupImage(this.entityId, image)

	this.state = PLAYER_STATE_ALIVE
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

	// Update state.
	const gameSystem = this.entityManager.getGameSystem()
	const lifeComponent = gameSystem.getComponent(this.entityId, GAME_COMPONENT_ID_LIFE)
	if (this.state === PLAYER_STATE_ALIVE && lifeComponent && lifeComponent.isDying()) {
		this.state = PLAYER_STATE_DYING
		// Display explosion when dying.
		const fadeoutComponent = new FadeoutComponent(
			this.entityId,
			this.explosionImage,
			PlayerShip.FADEOUT_TIME_SECOND,
			this.entityManager.getGraphicSystem()
		)
		gameSystem.addComponent(this.entityId, GAME_COMPONENT_ID_FADEOUT, fadeoutComponent)
	} 
}
