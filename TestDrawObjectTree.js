"use strict";

function testDrawObjectTreeNode() {
	let canvas = document.getElementById("canvas");
	let canvasContext = canvas.getContext("2d"); //Get the draw context
	canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

	let shapes = ShapeLoader.create().load(TEST_SHAPES);
	shapes.get("testDrawObjectTreeNodesRoot").draw(canvasContext);
}
