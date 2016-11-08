const Canvas = {
	create(canvas) {
		let canvasWrapper = Object.create(this.template);
		canvasWrapper.canvas = canvas;
		return canvasWrapper;
	},

	template: {
		canvas: null,
		drawObjects: [], //List of object to be drawn

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
