"use strict";

{ //Test add function
	let util = Util.create();

	//confirm that the list of draw objects is initialized
	let drawObjectManager = DrawObjectManager.create();

	let previousFunctionCalled = "";

	//Check that save is called before restore
	let expectedCanvasContext = {
		save() {
			util.assert(previousFunctionCalled == "");
			previousFunctionCalled = "save";
		},

		restore() {
			util.assert(previousFunctionCalled == "draw");
			previousFunctionCalled = "restore";
		}
	};

	let drawObject = {
		isCalled: false,
		draw(canvasContext) {
			util.assert(canvasContext == expectedCanvasContext);
			util.assert(previousFunctionCalled == "placeOn");
			this.isCalled = true;
			previousFunctionCalled = "draw";
		},

		placeOn(canvasContext) {
			util.assert(canvasContext == expectedCanvasContext);
			util.assert(previousFunctionCalled == "save");
			previousFunctionCalled = "placeOn";
		}

	};

	drawObjectManager.add(drawObject); //Test add
	//Test accessors
	util.assert(drawObjectManager.length() == 1);
	util.assert(drawObjectManager.get(0) == drawObject);

	//Test draw
	drawObjectManager.drawAllObjects(expectedCanvasContext);
	util.assert(drawObject.isCalled);
	util.assert(previousFunctionCalled == "restore");

	//Test remove
	drawObjectManager.remove(drawObject);
	util.assert(drawObjectManager.length() == 0);
}

{ //Test draw
	let util = Util.create();

	let previousFunction = "";

	let expectedCanvasContext = {
		save() {
			util.assert(previousFunction == "");
			previousFunction = "save";
		},
		translate(x, y) {
			util.assertEqualFloat(1.0, x);
			util.assertEqualFloat(2.0, y);
			util.assert(previousFunction == "save");
			previousFunction = "translate";
		},
		restore() {
			util.assert(previousFunction == "drawAllObjects");
			previousFunction = "restore";
		}
	};

	let camera = {
		getCanvas() {
			return {
				getContext() { return expectedCanvasContext; }
			};
		},
		getCanvasTranslation() { return Vector2D.create(1.0, 2.0); }
	};

	let drawObjectManager = DrawObjectManager.create();
	drawObjectManager.drawAllObjects = (canvasContext) => {
		util.assert(canvasContext == expectedCanvasContext);
		util.assert(previousFunction == "translate");
		previousFunction = "drawAllObjects";
	}

	drawObjectManager.draw(camera);

	util.assert(previousFunction == "restore");
}
