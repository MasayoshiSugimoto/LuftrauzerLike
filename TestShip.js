{
	//Test that the velocity does not get bigger than the max
	let ship = Ship.create();
	ship.updatePosition(50/*duration in second*/);	
	Util.create().assert(ship.getVelocity().distance() <= VELOCITY_MAX);
}

{
	//Test that the gravity is applied
	let ship = Ship.create();
	ship.updatePosition(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);	

	//Check that the gravity is applied to the velocity of the ship.
	Util.create().assert(ship.getVelocity().getX() == 0);
	Util.create().assert(ship.getVelocity().getY() > 0);

	//Check that the position has moved down
	Util.create().assert(ship.getPosition().getX() == 0);
	Util.create().assert(ship.getPosition().getY() > 0);
}

{
	//Check that if there is no input, the ship does not move.
	let ship = Ship.create();
	let util = Util.create();
	ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
	util.assert(ship.getVelocity().getX() == 0);
	util.assert(ship.getVelocity().getY() == 0);
	util.assert(ship.getPosition().getX() == 0);
	util.assert(ship.getPosition().getY() == 0);
}

{
	//Check that some velocity forward is added to the ship when the boost is on.
	let ship = Ship.create();
	let util = Util.create();
	ship.isBoost = true;
	ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
	util.assert(ship.getVelocity().getX() > 0);
	util.assert(ship.getVelocity().getY() == 0);
	util.assert(ship.getPosition().getX() == 0);
	util.assert(ship.getPosition().getY() == 0);
	util.assert(ship.getDirection() == 0);
}

{
	//Test that the direction change when the left button is pressed.
	let ship = Ship.create();
	let util = Util.create();
	ship.isLeft = true;
	ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
	util.assert(ship.getVelocity().getX() == 0);
	util.assert(ship.getVelocity().getY() == 0);
	util.assert(ship.getPosition().getX() == 0);
	util.assert(ship.getPosition().getY() == 0);
	util.assert(ship.getDirection() < 0);
}

{
	//Test that the direction change when the right button is pressed.
	let ship = Ship.create();
	let util = Util.create();
	ship.isRight = true;
	ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
	util.assert(ship.getVelocity().getX() == 0);
	util.assert(ship.getVelocity().getY() == 0);
	util.assert(ship.getPosition().getX() == 0);
	util.assert(ship.getPosition().getY() == 0);
	util.assert(ship.getDirection() > 0);
}
