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
