"use strict"

/********************************************************************************
 * Manages information related to camera
 *******************************************************************************/

function Camera(canvas, targetEntityId, entityManager) {
	this.topLeftMeter = Vector2D.zero()
	this.canvas = canvas
	this.physicsSystem = entityManager.getPhysicsSystem()
	this.targetEntityId = targetEntityId
}

Camera.prototype.getTopLeftMeter = function() {
	const halfScreen = new Vector2D(-this.canvas.getWidth() / 2, -this.canvas.getHeight() / 2)
	return this.getPositionMeter().add(halfScreen.scalarMultiply(1 / PIXEL_PER_METER))
}

Camera.prototype.toScreenCoordinates = function(vMeter) {
	const targetPositionMeter = this.physicsSystem.getComponent(this.targetEntityId).position
	let v = vMeter.substract(targetPositionMeter)
	v.y = -v.y
	return v.scalarMultiply(PIXEL_PER_METER).add(new Vector2D(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2))
}
