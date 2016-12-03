"use strict";

{ //Test the 'create' function
	let bullet = Bullet.create();
	let util = Util.create();

	util.assert(bullet.getPosition().getX() == 0);
	util.assert(bullet.getPosition().getY() == 0);
	util.assert(bullet.getDirection() == 0);
	util.assert(bullet.getVelocity() == 1.0);
	util.assert(bullet.getDrawObject().getSize().getX() == 5);
	util.assert(bullet.getDrawObject().getSize().getY() == 5);
}

{ //Test the 'fromData' function
	let bullet = Bullet.fromData(Vector2D.create(1.0, 2.0), 3.0);
	let util = Util.create();

	util.assert(bullet.getPosition().getX() == 1.0);
	util.assert(bullet.getPosition().getY() == 2.0);
	util.assert(bullet.getDirection() == 3);
	util.assert(bullet.getVelocity() == 1.0);
	util.assert(bullet.getDrawObject().getSize().getX() == 5);
	util.assert(bullet.getDrawObject().getSize().getY() == 5);
}

{ //Test 'updatePosition'. Move 1 meter to the right.
	let bullet = Bullet.create();
	let util = Util.create();

	bullet.updatePosition(1.0 /* duration in second */);

	util.assert(bullet.getPosition().getX() == 1.0);
	util.assert(bullet.getPosition().getY() == 0.0);
}


{ //Test 'updatePosition'. Move 1 meter down left.
	let bullet = Bullet.create();
	let util = Util.create();

	bullet.setDirection(-2.0 * Math.PI / 3.0);
	bullet.updatePosition(1.0 /* duration in second */);

	util.assert(bullet.getPosition().getX() < 0.0);
	util.assert(bullet.getPosition().getY() < 0.0);
	util.assert(util.compareFloat(bullet.getPosition().distance(), 1.0));
}
