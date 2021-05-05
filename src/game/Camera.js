"use strict"

/********************************************************************************
 * Manages information related to camera
 *******************************************************************************/

function Camera(canvas, targetEntityId, entityManager) {
	this.topLeftPixel = Vector2D.zero()
	this.centerPixel = Vector2D.zero()
	this.sizePixel = Vector2D.zero()
	this.canvas = canvas
	this.physicsSystem = entityManager.getPhysicsSystem()
	this.targetEntityId = targetEntityId
}

Camera.prototype.update = function() {
	const position = this.physicsSystem.getComponent(this.targetEntityId)
	this.sizePixel = new Vector2D(this.canvas.getWidth(), this.canvas.getHeight())
	this.centerPixel = position.scalarMultiply(PIXEL_PER_METER)
	this.topLeftPixel = this.centerPixel.substract(this.sizePixel.scalarMultiply(-0.5))
}
