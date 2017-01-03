"use strict";

{ //Test getters 
	let util = Util.create();

	let angle = { };

	let angularVector = AngularVector.create(angle, 1.0);

	//Test getters
	util.assert(angle == angularVector.getAngle());
	util.assertEqualFloat(1.0, angularVector.getY());
}

{ //Test add
	let util = Util.create();

	let angle2 = { };

	let expectedVector = { };

	let angle1 = {
		add(angle) {
			return expectedVector;
		}
	};

	let resultVector = AngularVector.create(angle1, 1.0)
			.add(AngularVector.create(angle2, 2.0));

	util.assert(resultVector.getAngle() == expectedVector);
	util.assertEqualFloat(3.0, resultVector.getY());
}

{ //Test substract
	let util = Util.create();

	let angle2 = { };

	let expectedVector = { };

	let angle1 = {
		substract(angle) {
			return expectedVector;
		}
	};

	let resultVector = AngularVector.create(angle1, 1.0)
			.substract(AngularVector.create(angle2, 2.0));

	util.assert(resultVector.getAngle() == expectedVector);
	util.assertEqualFloat(-1.0, resultVector.getY());	
}

{ //Test copy
	let util = Util.create();

	let angle = { };

	let resultVector = AngularVector.create(angle, 1.0).copy();

	util.assert(resultVector.getAngle() == angle);
	util.assertEqualFloat(1.0, resultVector.getY());
}

{ //Test toString
	let util = Util.create();

	let angle = {
		toString() {
			return "angleAsString";
		}
	};

	let resultString = AngularVector.create(angle, 1.0).toString();

	util.assert(resultString == "{angle:angleAsString,y:1}");
}

{ //Test equals
	let util = Util.create();

	let angle2 = { };

	let angle1 = {
		called: false,
		equals(angle) {
			this.called = true;
			return angle == angle2;
		}
	};
	util.assert(AngularVector.create(angle1, 1.0).equals(AngularVector.create(angle2, 1.0)));
	util.assert(angle1.called);
}
