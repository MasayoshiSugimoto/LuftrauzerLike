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

//const Canvas = {
//
//  create() {
//		const canvas = document.getElementById(Canvas.CANVAS_ID)
//		const windowObject = window
//
//    return {
//      getWidth() {
//        return canvas.width;
//      },
//
//      getHeight() {
//        return canvas.height;
//      },
//
//      getCenter() {
//        return Vector2D.create(this.getWidth(), this.getHeight()).scalarMultiply(0.5);
//      },
//
//      getGameSpaceWidth() {
//        return ScreenConversion.pixel2Meter(canvas.width);
//      },
//
//      getGameSpaceHeight() {
//        return ScreenConversion.pixel2Meter(canvas.getHeight());
//      },
//
//      getGameSpaceSize() {
//        return Vector2D.create(
//          ScreenConversion.pixel2Meter(canvas.width),
//          ScreenConversion.pixel2Meter(this.getHeight())
//        );
//      },
//
//      getGameSpaceCenter() {
//        return this.getGameSpaceSize().scalarMultiply(0.5);
//      },
//
//      getContext() {
//        return canvas.getContext("2d");
//      },
//
//      clear() {
//        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
//        return this;
//      },
//
//      setBackgroundColor(color) {
//        this.getContext().fillStyle = color;
//        this.getContext().fillRect(0, 0, this.getWidth(), this.getHeight());
//        return this;
//      },
//
//      center(drawObject) {
//        drawObject.setScreenPosition(this.getCenter());
//        return this;
//      },
//
//      fullScreen() {
//        canvas.width = windowObject.innerWidth;
//        canvas.height = windowObject.innerHeight; //Need a bigger height sample for the sea effect
//        return this;
//      },
//
//      getCanvas() {
//        return canvas;
//      },
//    }
//  }
//};

Canvas.CANVAS_ID = 'canvas'
