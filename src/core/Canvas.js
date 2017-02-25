"use strict";

const Canvas = {

	create(canvas, windowObject) {
		return {
			canvas						: canvas,
      windowObject      : windowObject,

			getWidth() {
				return this.canvas.width;
			},

			getHeight() {
				return this.canvas.height;
			},

      getCenter() {
        return Vector2D.create(this.getWidth(), this.getHeight()).scalarMultiply(0.5);
      },

			getGameSpaceWidth() {
				return ScreenConversion.pixel2Meter(this.canvas.width);
			},

			getGameSpaceHeight() {
				return ScreenConversion.pixel2Meter(this.canvas.height);
			},

			getGameSpaceSize() {
				return Vector2D.create(
					ScreenConversion.pixel2Meter(this.canvas.width),
					ScreenConversion.pixel2Meter(this.canvas.height)
				);
			},

			getContext() {
				return this.canvas.getContext("2d");
			},

      clear() {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
        return this;
      },

      setBackgroundColor(color) {
        this.getContext().fillStyle = color;
        this.getContext().fillRect(0, 0, this.getWidth(), this.getHeight());
        return this;
      },

      center(drawObject) {
        drawObject.setPosition(this.getCenter());
        return this;
      },

      fullScreen() {
        this.canvas.width = windowObject.innerWidth;
        this.canvas.height = windowObject.innerHeight;
        this.canvas.parentElement.style.margin = 0;
        return this;
      }

		}
	}

};
