{
	let shapeLoader = ShapeLoader.create();
	let shapes = {
		ship: {
			position:		{x:1,y:2},
			size:       {x:3,y:4},
			direction:  5,
			type:				"Rectangle"
		}
	};
	let ship = shapeLoader.load(shapes).get("ship");
	let util = Util.create();
	util.assert(ship.getGeometryType() === "Rectangle");
	util.assert(ship.getPosition().getX() === 1);
	util.assert(ship.getPosition().getY() === 2);
	util.assert(ship.getSize().getX() === 3);
	util.assert(ship.getSize().getY() === 4);
	util.assert(ship.getDirection() === 5);
}
