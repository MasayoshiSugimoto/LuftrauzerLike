"use strict";

const PIXEL_PER_METER							= 200;

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
		},

		meter2Pixel(distanceInMeter) {
			return distanceInMeter * PIXEL_PER_METER;
		}

		pixel2Meter(distanceInPixel) {
			return distanceInPixel / PIXEL_PER_METER;
		}

		vectorMeter2Pixel(v) {
			return v.scalarMultiply(PIXEL_PER_METER);
		}

		vectorPixel2Meter(v) {
			return v.scalarMultiply(1 / PIXEL_PER_METER);
		}

	}
};
