"use strict";

const TestImageDrawObject = {

	util: Util.create()

};

{ //Test placeOn

	let imageDrawObject = ImageDrawObject.create({});
	imageDrawObject.setPosition(Vector2D.create(10, 20));
	imageDrawObject.setDirection(3.0);

	let previousFunction = "";

	let canvasContext = {
		translate(x, y) {
			TestImageDrawObject.util.assert(previousFunction == "");
			previousFunction = "translate"
			TestImageDrawObject.util.assert(x == 10);	
			TestImageDrawObject.util.assert(y == 20);
		},
		rotate(direction) {
			TestImageDrawObject.util.assert(previousFunction == "translate");
			previousFunction = "rotate";
			TestImageDrawObject.util.assert(direction == 3.0);
		}
	};

	imageDrawObject.placeOn(canvasContext);
	TestImageDrawObject.util.assert(previousFunction == "rotate");
}

{ //Test draw

	let expectedImage = {
		width: 10,
		height: 20
	};

	let imageDrawObject = ImageDrawObject.create(expectedImage);

	let previousFunction = "";

	let canvasContext = {
		drawImage(image, x, y) {
			TestImageDrawObject.util.assert(previousFunction == "");
			previousFunction = "drawImage";
			TestImageDrawObject.util.assert(image == expectedImage);
			TestImageDrawObject.util.assert(x == -5);
			TestImageDrawObject.util.assert(y == -10);
		}
	};

	imageDrawObject.draw(canvasContext);
	TestImageDrawObject.util.assert(previousFunction == "drawImage");

}
