"use strict";

const Canvas = {

	create(canvas, windowObject) {
		return {
			getWidth() {
				return canvas.width;
			},

			getHeight() {
				return canvas.height;
			},

      getCenter() {
        return Vector2D.create(this.getWidth(), this.getHeight()).scalarMultiply(0.5);
      },

			getGameSpaceWidth() {
				return ScreenConversion.pixel2Meter(canvas.width);
			},

			getGameSpaceHeight() {
				return ScreenConversion.pixel2Meter(canvas.height);
			},

			getGameSpaceSize() {
				return Vector2D.create(
					ScreenConversion.pixel2Meter(canvas.width),
					ScreenConversion.pixel2Meter(canvas.height)
				);
			},

      getGameSpaceCenter() {
        return this.getGameSpaceSize().scalarMultiply(0.5);
      },

			getContext() {
				return canvas.getContext("2d");
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
        canvas.width = windowObject.innerWidth;
        canvas.height = windowObject.innerHeight;
        canvas.parentElement.style.margin = 0;
        return this;
      }

		}
	}

};
