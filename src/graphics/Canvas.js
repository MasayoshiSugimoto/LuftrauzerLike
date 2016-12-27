"use strict";

const Canvas = {

	create(canvas, drawObjectManager) {
		return Object.assign(
			{
				canvas						: canvas,
				drawObjectManager : drawObjectManager
			},
			this.proto
		);
	},

	proto: {

		registerDrawObject(drawObject) {
			this.drawObjectManager.add(drawObjects);
			return this;
		},

		draw() {
			context = canvas.getContext("2d");
			context.clearRect(0,0,canvas.width,canvas.height); //Clear the canvas

			this.drawObjectManager.draw(context);
		},

	}

};
