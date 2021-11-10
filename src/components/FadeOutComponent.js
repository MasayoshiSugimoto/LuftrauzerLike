/*******************************************************************************
 * Fadeout component.
 ******************************************************************************/

export function FadeoutComponent(entityId, image, fadeoutTime, graphicSystem) {
	this.timer = fadeoutTime
	this.maxTimer = fadeoutTime
	this.graphicSystem = graphicSystem
  this.graphicSystem.setupImage(entityId, image)
}

FadeoutComponent.prototype.update = function(entityId, elapsedTimeSecond) {
	this.timer = Math.max(0, this.timer - elapsedTimeSecond)
	const opacity = this.timer / this.maxTimer
	this.graphicSystem.setOpacity(entityId, opacity)
}
