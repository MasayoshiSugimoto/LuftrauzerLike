const STANDARD_FRAME_DURATION_SECOND = 1 / 30;

{
  //Test that the velocity does not get bigger than the max
  const ship = Ship.create(ShipKeyboardControllerTest());
  ship.updatePosition(50/*duration in second*/);
  Util.create().assert(ship.getVelocity().distance() <= SHIP_VELOCITY_MAX);
}

{
  //Test that the gravity is applied
  const ship = Ship.create(ShipKeyboardControllerTest());
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
  const ship = Ship.create(ShipKeyboardControllerTest());
  const util = Util.create();
  ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
  util.assert(ship.getVelocity().getX() == 0);
  util.assert(ship.getVelocity().getY() == 0);
  util.assert(ship.getPosition().getX() == 0);
  util.assert(ship.getPosition().getY() == 0);
}

{
  //Check that some velocity forward is added to the ship when the boost is on.
  const shipController = ShipKeyboardControllerTest();
  shipController.isBoost = () => {
    return true;
  };
  const ship = Ship.create(shipController);
  const util = Util.create();
  ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
  util.assert(ship.getVelocity().getX() > 0);
  util.assert(ship.getVelocity().getY() == 0);
  util.assert(ship.getPosition().getX() == 0);
  util.assert(ship.getPosition().getY() == 0);
  util.assert(ship.getDirection() == 0);
}

{
  //Test that the direction change when the left button is pressed.
  const shipController = ShipKeyboardControllerTest();
  shipController.isLeft = () => { return true; };
  const ship = Ship.create(shipController);
  const util = Util.create();
  ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
  util.assert(ship.getVelocity().getX() == 0);
  util.assert(ship.getVelocity().getY() == 0);
  util.assert(ship.getPosition().getX() == 0);
  util.assert(ship.getPosition().getY() == 0);
  util.assert(ship.getDirection() < 0);
}

{
  //Test that the direction change when the right button is pressed.
  const shipController = ShipKeyboardControllerTest();
  shipController.isRight = () => {
    return true;
  };
  const ship = Ship.create(shipController);
  const util = Util.create();
  ship.updateControl(STANDARD_FRAME_DURATION_SECOND /*duration in second*/);
  util.assert(ship.getVelocity().getX() == 0);
  util.assert(ship.getVelocity().getY() == 0);
  util.assert(ship.getPosition().getX() == 0);
  util.assert(ship.getPosition().getY() == 0);
  util.assert(ship.getDirection() > 0);
}

{ //Test 'ShipFactory'
  const util = Util.create();

  const shipFactory = ShipFactory(ShipKeyboardControllerTest());
  const ship = shipFactory.createShip();

  util.assert("Ship" == ship.className); 
}

{ //Test 'isDead'
  const util = Util.create();

  const ship = Ship.create(ShipKeyboardControllerTest());
  for (index = 0; index < 9; index++) {
    ship.collide();
  }
  util.assert(!ship.isDead());
  ship.collide();
  util.assert(ship.isDead());
  util.assert(ship.toDelete());
}

{ //Test 'getRadius'
  const util = Util.create();

  const ship = Ship.create(ShipKeyboardControllerTest());
  let called = false;
  ship.updateControl = (elapsedTime) => {
    called = true;
    return ship;
  }
  ship.update(0);
  util.assert(called);
  ship.hp = 0;
  ship.updateControl = (elapsedTime) => {
    util.assert(false);
    return ship;
  }
  ship.update(0);
}
