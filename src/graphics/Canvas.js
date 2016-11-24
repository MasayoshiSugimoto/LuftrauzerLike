"use strict";

const Canvas = {

	create(canvas) {
		let canvasWrapper = Object.create(this.template);
		canvasWrapper.canvas = canvas;
		canvasWrapper.drawObjects = []; //List of objects to be drawn
		return canvasWrapper;
	},

	template: {

		registerDrawObject(drawObject) {
			this.drawObjects.push(drawObjects);
		},

		draw() {
			context = canvas.getContext("2d");
			context.clearRect(0,0,canvas.width,canvas.height); //Clear the canvas

			//Draw registered objects
			for (let index = 0; index < this.drawObjects.length; ++index) {
				this.drawObjects[index].draw();
			}
		}

	}
};
