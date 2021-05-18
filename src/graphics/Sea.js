"use strict"

/*******************************************************************************
 * This class draws the sea.
 *
 * Because the battle area will be reflected in the sea, the sea needs to be
 * drawn after the rest of the game entities.
 ******************************************************************************/

Sea.Y_COORDINATE_METER = -1

function Sea(canvas, camera) {
	this.canvas = canvas
	this.camera = camera
}

Sea.prototype.draw = function() {
	const canvasContext = this.canvas.getContext()
	const seaLevelPixel = this.camera.toScreenCoordinates(new Vector2D(0, Sea.Y_COORDINATE_METER)).y
		
	//Draw the sea
	if (seaLevelPixel <= this.canvas.getHeight()) {
		const width = this.canvas.getWidth()
		const height = this.canvas.getHeight()
		canvasContext.save()
		//Set the backgroud of the sea in blue
		canvasContext.fillStyle = "blue"
		canvasContext.fillRect(0, seaLevelPixel, width, height)

		canvasContext.globalAlpha = 0.5
		canvasContext.translate(width / 2, seaLevelPixel);
		canvasContext.rotate(Math.PI);
		canvasContext.scale(-1, 1) //Flip image
		const seadDepth = height - seaLevelPixel
		canvasContext.drawImage(
			this.canvas.canvas,
			0,
			0,
			width,
			seaLevelPixel, //Clip coordinates
			-width / 2,
			-seaLevelPixel,
			width,
			seaLevelPixel
		)
		canvasContext.restore()
	}
}


function SeaComponent(entityId, physicsSystem) {
	this.entityId = entityId
	this.physicsSystem = physicsSystem
	this.inputData = {
    boost: true,
    left: false,
    right: false,
    fire: false
  }
}

// TODO: Add a game system to add game components.
SeaComponent.prototype.update = function() {
	const component = this.physicsSystem.getComponent(this.entityId)
	if (component.position.y <= Sea.Y_COORDINATE_METER) {
		const baseAngle = Angle.normalize(component.direction+Math.PI/2)
		if (baseAngle >= 0) {
			this.inputData.left = true
			this.inputData.right = false
		} else {
			this.inputData.left = false
			this.inputData.right = true
		}
	}
}
