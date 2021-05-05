"use strict"

/*******************************************************************************
 * This class draws the sea.
 *
 * Because the battle area will be reflected in the sea, the sea needs to be
 * drawn after the rest of the game entities.
 ******************************************************************************/

Sea.Y_COORDINATE_METER = -3

function Sea(canvas, camera) {
	this.canvas = canvas
	this.camera = camera
/*
  return { 
    draw() {
      const canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      //canvas.parentElement.style.margin = 0;
      const canvasContext = canvas.getContext("2d");

      //Draw game area canvas
      canvasContext.drawImage(inMemoryCanvas.getCanvas(), 0, 0);

      //Calculate the coordinates from where to draw the sea
      const seaHeight = camera.getCanvasTranslation().minus().getY() + inMemoryCanvas.getHeight()
          - ScreenConversion.meter2Pixel(gameMap.getBottom())

      //Draw the sea
      if (seaHeight > 0) {
        //Set the backgroud of the sea in blue
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(0, canvas.height - seaHeight, canvas.width, canvas.height);
        //Transparency of the refection
        const previousOpacity = canvasContext.globalAlpha;
        canvasContext.globalAlpha = 0.5;
        //Applying the battlefield canvas reflection
        canvasContext.translate(canvas.width / 2, canvas.height / 2);
        canvasContext.rotate(Math.PI);
        canvasContext.scale(-1, 1); //Flip image
        canvasContext.drawImage(inMemoryCanvas.getCanvas(),
            0, 0, canvas.width, canvas.height - seaHeight, //Clip coordinates
            -canvas.width / 2, -canvas.height / 2 - canvas.height + seaHeight * 2,
            canvas.width, canvas.height - seaHeight);
        canvasContext.globalAlpha = previousOpacity;
      }
    },
  };
*/
}

Sea.prototype.draw = function() {
	const canvasContext = this.canvas.getContext()
	const seaLevelOnScreen = (Sea.Y_COORDINATE_METER * -PIXEL_PER_METER) - this.camera.y_pixel
		
	//Draw the sea
	if (seaLevelOnScreen <= this.camera.y_pixel + this.camera.height_pixel) {
		canvasContext.save()
		//Set the backgroud of the sea in blue
		canvasContext.globalAlpha = 0.5;
		canvasContext.fillStyle = "blue";
		canvasContext.fillRect(0, seaLevelOnScreen, this.canvas.width, this.canvas.height);
//		//Transparency of the refection
//		const previousOpacity = canvasContext.globalAlpha;
//		canvasContext.globalAlpha = 0.5;
//		//Applying the battlefield canvas reflection
//		canvasContext.translate(canvas.width / 2, canvas.height / 2);
//		canvasContext.rotate(Math.PI);
//		canvasContext.scale(-1, 1); //Flip image
//		canvasContext.drawImage(inMemoryCanvas.getCanvas(),
//				0, 0, canvas.width, canvas.height - seaHeight, //Clip coordinates
//				-canvas.width / 2, -canvas.height / 2 - canvas.height + seaHeight * 2,
//				canvas.width, canvas.height - seaHeight);
//		canvasContext.globalAlpha = previousOpacity;
		canvasContext.restore()
	}
}
