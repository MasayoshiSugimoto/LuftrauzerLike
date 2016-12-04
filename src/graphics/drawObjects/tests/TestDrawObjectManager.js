"use strict";

{ //Test add function
	let drawObjectManager = DrawObjectManager.create();
	//confirm that the list of draw objects is initialized
	let expectedCanvasContext = {};
	let util = Util.create();
	let drawObject = {
		isCalled: false,
		draw(canvasContext) {
			util.assert(canvasContext == expectedCanvasContext);
			this.isCalled = true;
		}
	};

	drawObjectManager.add(drawObject); //Test add
	//Test accessors
	util.assert(drawObjectManager.length() == 1);
	util.assert(drawObjectManager.get(0) == drawObject);

	//Test draw
	drawObjectManager.draw(expectedCanvasContext);
	util.assert(drawObject.isCalled);

	//Test remove
	drawObjectManager.remove(drawObject);
	util.assert(drawObjectManager.length() == 0);
}
