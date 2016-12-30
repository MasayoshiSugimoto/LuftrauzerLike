"use strict";

const Canvas = {

	create(canvas) {
		return {
			canvas						: canvas,
			drawObjectManager : drawObjectManager,

			registerDrawObject(drawObject) {
				this.drawObjectManager.add(drawObjects);
				return this;
			},

			getWidth() {
				return this.canvas.width;
			},

			getHeight() {
				return this.canvas.height;
			},

			getGameSpaceWidth() {
				return ScreenConversion.pixel2Meter(this.canvas.width);
			},

			getGameSpaceHeight() {
				return ScreenConversion.pixel2Meter(this.canvas.height);
;
			},

			getGameSpaceSize() {
				return Vector2D.create(
					ScreenConversion.pixel2Meter(this.canvas.width),
					ScreenConversion.pixel2Meter(this.canvas.height)
				);
			},

			getContext() {
				return this.canvas.getContext("2d");
			}

		}
	}

};
