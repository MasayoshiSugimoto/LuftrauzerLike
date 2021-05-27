"use strict"

/*******************************************************************************
 * This class draws the sky.
 *
 * This needs to be drawn last to always be on top.
 ******************************************************************************/

const SKY_COORDINATES_METER = new Vector2D(0, SKY_Y_COORDINATE_METER)
const SKY_COLOR_GRADIENT_START = '#EEEEFF00'
const SKY_COLOR_GRADIENT_END = '#EEEEFFEE'
const SKY_GRADIENT_LENGTH_PIXEL = 300

function drawSky(canvas, camera) {
	const skyLevel = camera.toScreenCoordinates(SKY_COORDINATES_METER).y
	const startGradient = skyLevel + SKY_GRADIENT_LENGTH_PIXEL
	const context = canvas.getContext()
	if (startGradient > 0) {
		const width = canvas.getWidth()
		context.save()
		const gradient = context.createLinearGradient(0, startGradient, 0, skyLevel)
		gradient.addColorStop(0, SKY_COLOR_GRADIENT_START)
		gradient.addColorStop(1, SKY_COLOR_GRADIENT_END)
		context.fillStyle = gradient
		context.fillRect(0, 0, width, startGradient)
		context.restore()
	}
}


