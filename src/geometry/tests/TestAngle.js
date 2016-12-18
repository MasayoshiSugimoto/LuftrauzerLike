"use strict";

let util = Util.create();

{
	function testAngle(angleInRadian) {
		let angle = Angle.create(angleInRadian);
		util.assert(angle.get() == angleInRadian);

		let angle2 = Angle.create(0.0);
		util.assert(angle2.set(angleInRadian).get() == angleInRadian);
	}

	{ //Test to set a zero angle
		testAngle(0.0);
	}

	{ //Test to set a positive angle smaller than PI
		testAngle(Math.PI / 2.0);
	}

	{ //Test to set a negative angle smaller than PI
		testAngle(-Math.PI / 2.0);
	}

	{ //Test to set PI
		testAngle(Math.PI);
		testAngle(-Math.PI);
	}

	{ //Test an angle little bit smaller than PI
		let angle = Angle.create(Math.PI + EPSILON);
		util.assertEqualFloat(-Math.PI + EPSILON, angle.get());

		let angle2 = Angle.create(0.0);
		util.assertEqualFloat(angle2.set(Math.PI + EPSILON).get(), -Math.PI + EPSILON);
	}

	{ //Test to set a positive angle greater than PI and smaller than 2PI
		let angle = Angle.create(1.5 * Math.PI);
		util.assertEqualFloat(angle.get(), -0.5 * Math.PI);

		let angle2 = Angle.create(0.0);
		util.assertEqualFloat(angle2.set(1.5 * Math.PI).get(), -0.5 * Math.PI);
	}

	{ //Test to set a negative angle greater than PI and smaller than 2PI
		let angle = Angle.create(-1.5 * Math.PI);
		util.assertEqualFloat(angle.get(), 0.5 * Math.PI);

		let angle2 = Angle.create(0.0);
		util.assertEqualFloat(angle2.set(-1.5 * Math.PI).get(), 0.5 * Math.PI);
	}

	{ //Test to set a positive angle greater than 2 PI and smaller than 3PI
		let angle = Angle.create(2.5 * Math.PI);
		util.assertEqualFloat(angle.get(), 0.5 * Math.PI);

		let angle2 = Angle.create(0.0);
		util.assertEqualFloat(angle2.set(2.5 * Math.PI).get(), 0.5 * Math.PI);
	}

	{ //Test to set a negative angle greater than 2 PI and smaller than 3PI
		let angle = Angle.create(-2.5 * Math.PI);
		util.assertEqualFloat(angle.get(), -0.5 * Math.PI);

		let angle2 = Angle.create(0.0);
		util.assertEqualFloat(angle2.set(-2.5 * Math.PI).get(), -0.5 * Math.PI);
	}
}

{ //Test to apply minus on the angle
	let angle = Angle.create(1.0);
	util.assertEqualFloat(-1.0, angle.minus().get());
}

{ //Test add
	let angle1 = Angle.create(Math.PI);
	let angle2 = Angle.create(0.5 * Math.PI);
	let result = angle1.add(angle2);
	util.assertEqualFloat(-0.5 * Math.PI, result.get());
}

{ //Test substract
	let angle1 = Angle.create(Math.PI);
	let angle2 = Angle.create(0.5 * Math.PI);
	util.assertEqualFloat(0.5 * Math.PI, angle1.substract(angle2).get());
}

{ //Test equals
	util.assert(Angle.create(0.0).equals(Angle.create(0.0)));
	util.assert(Angle.create(EPSILON / 3.0).equals(Angle.create(-EPSILON / 3.0)));
	util.assert(Angle.create(0.5 * Math.PI).equals(Angle.create(0.5 * Math.PI)));
	util.assert(Angle.create(Math.PI).equals(Angle.create(Math.PI)));
	util.assert(Angle.create(Math.PI + EPSILON / 3.0).equals(Angle.create(Math.PI - EPSILON / 3.0)));
}
