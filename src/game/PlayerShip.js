"use strict";

/*******************************************************************************
 * Player Ship
 ******************************************************************************/

PlayerShip.ROTATION_UNIT = Math.PI * 2; // Rotation allowed per second.
PlayerShip.BOOST_UNIT = 5 // Velocity in meter/s^2.
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

function PlayerShip(inputData, entityId, entityManager, images, blaster) {
  this.inputData = inputData
  this.physicEntity = new PhysicEntity(
    entityId,
    entityManager.getPhysicsSystem()
  )
  this.images = PlayerShip.IMAGE_PATHS.map(path => images.get(path))
  this.entityManager = entityManager
  this.entityId = entityId
  this.angle = 0
  this.blaster = blaster
	this.graphicSystem = entityManager.getGraphicSystem()

	// Initialize with an image.
  this.graphicSystem.setupImage(this.entityId, this.images[PlayerShip.TOP_VIEW_INDEX])
}

PlayerShip.prototype.update = function(elapsedTimeSecond) {
  // Update physics based on user inputs.
  let direction = this.physicEntity.getDirection()
  if (this.inputData.left) {
    direction -= PlayerShip.ROTATION_UNIT * elapsedTimeSecond
  } else if (this.inputData.right) {
    direction += PlayerShip.ROTATION_UNIT * elapsedTimeSecond
  }
  direction = Angle.normalize2PI(direction)
  this.physicEntity.setDirection(direction)

  let boost = 0
  if (this.inputData.boost) {
    boost = PlayerShip.BOOST_UNIT
  }
  this.physicEntity.setAcceleration(new Vector2D(boost, 0).rotate(direction))

  // Update blaster.
  this.blaster.update(elapsedTimeSecond)
}

