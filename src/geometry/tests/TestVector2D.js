"use strict";

{
	let v = Vector2D.create(1,2);

	let util = Util.create();
	util.assert(v.getX() == 1);
	util.assert(v.getY() == 2);

	let addTestVector = v.add(Vector2D.create(3,4));
	util.assert(addTestVector.getX() == 4);
	util.assert(addTestVector.getY() == 6);

	let scalarMultiplyTestVector = v.scalarMultiply(2);
	util.assert(scalarMultiplyTestVector.getX() == 2);
	util.assert(scalarMultiplyTestVector.getY() == 4);

	let copyTestVector = v.copy();
	copyTestVector.x = 3;
	util.assert(copyTestVector.getX() != v.getX());

	let resizeTestVector = v.resize(1);
	util.assert(resizeTestVector.getX() * resizeTestVector.getX() +
			resizeTestVector.getY() * resizeTestVector.getY() <= 1);

	util.assert(v.distance() < 3);
	
	util.assert(v.cut(2).distance() <= 2 + EPSILON);

	//Test a complete circle rotation.
	for (let index = 0;
			index < 2 * 10 + 1/*+1 to be sure to test bigger than 2 * PI*/;
			index++) {
		let angle = index * (Math.PI / 10);
		let baseVector = Vector2D.create(1,0);
		let rotatedVector = baseVector.rotate(angle);
		//Check that the size of the vector did not change
		util.assert(util.compareFloat(rotatedVector.distance(),baseVector.distance()));
		//Check the correctness of the rotated angle.
		if (!util.compareFloat(rotatedVector.getX(),0)) {
			util.assert(util.compareFloat(
					Math.tan(angle),
					rotatedVector.getY() / rotatedVector.getX()));
		}
	}

}

{ //Test substract
	let util = Util.create();
	util.assert(Vector2D.create(1.0, 2.0).substract(Vector2D.create(1.0, 2.0)).x == 0.0);
	util.assert(Vector2D.create(1.0, 2.0).substract(Vector2D.create(1.0, 2.0)).y == 0.0);
}

{ //Test getAngle
	let util = Util.create();

	let v2 = Vector2D.create(3.0, 3.0);
	util.assertEqualFloat(Math.PI / 4.0, v2.getAngle().get());

	let v3 = Vector2D.create(2.0, 0.0);
	util.assertEqualFloat(0.0, v3.getAngle().get());

	let v4 = Vector2D.create(0.0, 5.0);
	util.assertEqualFloat(Math.PI / 2.0, v4.getAngle().get());
}

{ //Test distanceBetween
	let util = Util.create();

	util.assertEqualFloat(
		0.0,
		Vector2D.distanceBetween(Vector2D.create(1.0, 2.0), Vector2D.create(1.0, 2.0))
	);

	util.assertEqualFloat(
		1.0,
		Vector2D.distanceBetween(Vector2D.create(1.0, 2.0), Vector2D.create(1.0, 3.0))
	);

	util.assertEqualFloat(
		1.0,
		Vector2D.distanceBetween(Vector2D.create(1.0, 2.0), Vector2D.create(2.0, 2.0))
	);
}
