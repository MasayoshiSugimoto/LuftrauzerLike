"use strict";

{ //Test that no bullet is created before the fire timer
	let bulletFactory = {
		isCreatedCalled: false,
		create() { this.isCreateCalled = true; }
	};
	let machineGun = MachineGun.create({}, bulletFactory, {}, {});

	machineGun.fire(0.1 /*second*/);
	let util = Util.create();
	util.assert(!bulletFactory.isCreatedCalled);
}

{ //Test that a bullet is created at the fire rate
	let util = Util.create();

	//Create draw object
	let expectedDrawObject = {};

	//Create bullet
	let bullet = {
		getDrawObject() { return expectedDrawObject; }
	};

	//Create bullet factory
	let bulletFactory = {
		fromData() { return bullet; }
	};

	//Create drawObjectManager
	let drawObjectManager = {
		removeCounter: 0,
		addDrawObjectCounter: 0,
		addDrawObject(drawObject) {
			util.assert(drawObject == expectedDrawObject);
			this.addDrawObjectCounter++;
		},
		remove(drawObject) {
			util.assert(drawObject == expectedDrawObject);
			this.removeCounter++;
		}
	};

	//Create ship
	let ship = {
		getPosition() { },
		getDirection() { }
	};

	//Create machinegun
	let machineGun = MachineGun.create(ship, bulletFactory, drawObjectManager);

	//Fire for 1 second and check that the first bullet is created
	machineGun.fire(1.0);
	util.assert(drawObjectManager.addDrawObjectCounter == 1);
	util.assert(machineGun.getBulletsLength() == 1);

	//Fire for 0.5 second and check that no bullet has been created.
	machineGun.fire(0.5);
	util.assert(drawObjectManager.addDrawObjectCounter == 1);
	util.assert(machineGun.getBulletsLength() == 1);

	//Fire for another 0.5 second and check that the second bullet has been created.
	machineGun.fire(0.5 + EPSILON);
	util.assert(machineGun.getBulletsLength() == 2);
	util.assert(drawObjectManager.addDrawObjectCounter == 2);

	//Wait for the object to be deleted.
	setTimeout( () => {
			util.assert(machineGun.getBulletsLength() == 0);
			util.assert(drawObjectManager.removeCounter == 2);
		}, 5500 /* milliseconds */ );
}

{ //Test clear function
	let util = Util.create();

	let machineGun = MachineGun.create({}, {}, {}, {});

	//Fire for 0.5 seconds
	machineGun.fire(0.5);
	util.assert(machineGun.getFireTimer() != 0.0);

	//Clear and check if the time has been reset
	machineGun.clear();
	util.assert(machineGun.getFireTimer() == 0.0);
}

{ //Test onFireStart and onFireStop events
	let util = Util.create();
	let bulletFactory = {
		fromDataCounter: 0,
		fromData() {
			this.fromDataCounter++;
			return { getDrawObject() {} };
		}
	};
	let ship = {
		getPosition() { },
		getDirection() { }
	};
	let drawObjectManager = {
		addDrawObject() { },
		remove() { }
	};
	let machineGun = MachineGun.create(ship, bulletFactory, drawObjectManager);

	//Update more than 1 second and check than no bullet has been fired.
	machineGun.update(1.1 /* second */);
	util.assert(bulletFactory.fromDataCounter == 0);

	//Raise fire start event.
	machineGun.onFireStart();

	//Update more than 1 second and check that a bullet has been fired.
	machineGun.update(1.1 /* second */);
	util.assert(bulletFactory.fromDataCounter == 1);

	//Raise fire stop event.
	machineGun.onFireStop();
	util.assert(bulletFactory.fromDataCounter == 1);

	//Update more than 1 second and check than no bullet has been fired.
	machineGun.update(1.1 /* second */);

	//Raise fire start event.
	machineGun.onFireStart();

	//Update more than 1 second and check that a bullet has been fired.
	machineGun.update(1.1 /* second */);
	util.assert(bulletFactory.fromDataCounter == 2);
}
