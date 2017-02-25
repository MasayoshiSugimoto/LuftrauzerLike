"use strict";

function testRectangleDrawObject() {
  let canvas = document.getElementById("canvas");
  let canvasContext = canvas.getContext("2d"); //Get the draw context
  canvasContext.clearRect(0,0,canvas.width, canvas.height); //Clear context

  let shapes = ShapeLoader.create().load(TEST_SHAPES);
  let rectangleDraw =
    RectangleDrawObject.create(shapes.get("testRectangle1"));
  rectangleDraw.draw(canvasContext);

}
