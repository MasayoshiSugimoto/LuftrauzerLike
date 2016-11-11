"use strict";

{
	let testRectangle = Rectangle.fromData(
		{
			position:		{x:1,y:2},
			size:       {x:3,y:4},
			direction:  5,
			type:				"Rectangle"
		}
	);

	let util = Util.create();

	util.assert(testRectangle.getPosition().getX() == 1);
	util.assert(testRectangle.getPosition().getY() == 2);
	util.assert(testRectangle.getSize().getX() == 3);
	util.assert(testRectangle.getSize().getY() == 4);
	util.assert(testRectangle.getDirection() == 5);
	util.assert(testRectangle.getGeometryType() == "Rectangle");
}
