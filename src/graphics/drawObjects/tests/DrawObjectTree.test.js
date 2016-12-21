"use strict";

function testDrawObjectTree() {
	let canvas = document.getElementById("canvas");
	let canvasContext = canvas.getContext("2d"); //Get the draw context
	canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

	let shapes = ShapeLoader.create().load(TEST_SHAPES);
	shapes.get("testDrawObjectTreeRoot").draw(canvasContext);
}

//Print all the shapes of 'SHAPES' by interval.
function testAllShapes() {
	let canvas = document.getElementById("canvas");
	let canvasContext = canvas.getContext("2d"); //Get the draw context

	//Create a list of shapes
	let shapes = [];
	ShapeLoader.create().load(SHAPES).forEach( function(shape, shapeName, map) {
		shapes.push(shape);
	});

	//Draw the shapes
	window.setInterval( function() {
		canvasContext.clearRect(0,0,canvas.width, canvas.height);
		let shape = shapes.shift();
		shape.draw(canvasContext);
		shapes.push(shape);
	}, 1000/*milliseconds*/);

}
