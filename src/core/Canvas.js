"use strict";

/********************************************************************************
 * Manages the canvas where the game is rendered.
 *******************************************************************************/

function Canvas() {
	this.canvas = document.getElementById(Canvas.CANVAS_ID)
	this.context = this.canvas.getContext("2d")
}

Canvas.prototype.getWidth = function() {
	return this.canvas.width
}

Canvas.prototype.getHeight = function() {
	return this.canvas.height
}

Canvas.prototype.fullScreen = function() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

Canvas.prototype.setBackgroundColor = function(color) {
	this.context.fillStyle = color
	this.context.fillRect(0, 0, this.getWidth(), this.getHeight())
}

Canvas.prototype.getContext = function() {
	return this.context
}

Canvas.CANVAS_ID = 'canvas'
