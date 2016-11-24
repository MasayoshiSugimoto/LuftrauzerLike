"use strict";

const TestShapeLoader = {
	testShip() {
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
	},

	testDrawObjectTreeRoot() {
		let shapeLoader = ShapeLoader.create();
		let tree = shapeLoader.load(TEST_SHAPES)
				.get("testDrawObjectTreeRoot");

		let util = Util.create();
		util.assert(tree.getPosition().getX() == 400);
		util.assert(tree.getPosition().getY() == 300);
		util.assert(tree.getSize().getX() == 10);
		util.assert(tree.getSize().getY() == 100);
		util.assert(tree.getDirection() == 0);
		util.assert(tree.getChildren().length == 2);
		let child0 = tree.getChildren()[0];
		util.assert(child0.getGeometryType() == "Rectangle");
		util.assert(child0.getPosition().getX() == "100");
		util.assert(child0.getPosition().getY() == "0");
		util.assert(child0.getSize().getX() == "10");
		util.assert(child0.getSize().getY() == "100");
		util.assert(child0.getDirection() == Math.PI / 4);
		let child1 = tree.getChildren()[1];
		util.assert(child1.getGeometryType() == "Rectangle");
		util.assert(child1.getPosition().getX() == "0");
		util.assert(child1.getPosition().getY() == "100");
		util.assert(child1.getSize().getX() == "10");
		util.assert(child1.getSize().getY() == "100");
		util.assert(child1.getDirection() == -Math.PI / 4);
	}
}

TestShapeLoader.testDrawObjectTreeRoot();
