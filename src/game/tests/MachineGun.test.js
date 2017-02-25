"use strict";

{ //Test that no bullet is created before the fire timer
  let util = Util.create();

  let ship = {
    position: { },
    direction: { }
  };

  let machineGunFactory = {
    bulletFactory: {
      isFromDataCalled: false,
      fromData(position, direction) {
        this.isFromDataCalled = true;
        util.assert(position == ship.position);
        util.assert(direction == ship.direction);
      }
    }
  };

  let machineGun = MachineGun.create(ship, machineGunFactory);

  machineGun.fire(0.01 /*second*/);
  util.assert(!machineGunFactory.bulletFactory.isFromDataCalled);
}

{ //Test that a bullet is created at the fire rate
  let util = Util.create();

  //Create bullet
  let bullet = { };

  //Create bullet factory
  let bulletFactory = {
    fromData() { return bullet; }
  };

  let expectedDrawObjectGameObject = { };

  //Create drawObjectManager
  let drawObjectManager = {
    removeCounter: 0,
    addDrawObjectCounter: 0,
    add(drawObject) {
      util.assert(drawObject == expectedDrawObjectGameObject);
      this.addDrawObjectCounter++;
    },
    remove(drawObject) {
      util.assert(drawObject == expectedDrawObjectGameObject);
      this.removeCounter++;
    }
  };

  //Create ship
  let ship = {
    getPosition() { },
    getDirection() { }
  };

  let gameObjectDrawObjectFactory = {
    create(drawObject, gameObject) {
      util.assert(drawObject == SHAPE_MAP.get("bullet"));
      util.assert(gameObject == bullet);
      return expectedDrawObjectGameObject;
    }
  };

  //Create machinegun
  let machineGun = MachineGunFactory.create(bulletFactory, drawObjectManager, gameObjectDrawObjectFactory)
      .createMachineGun(ship);

  //Fire for 0.05 second and check that the first bullet is created
  machineGun.fire(0.05);
  util.assert(drawObjectManager.addDrawObjectCounter == 1);
  util.assert(machineGun.getBulletsLength() == 1);

  //Fire for 0.01 second and check that no bullet has been created.
  machineGun.fire(0.01);
  util.assert(drawObjectManager.addDrawObjectCounter == 1);
  util.assert(machineGun.getBulletsLength() == 1);

  //Fire for another 0.5 second and check that the second bullet has been created.
  machineGun.fire(0.04 + EPSILON);
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

  //Fire for 0.01 seconds
  machineGun.fire(0.01);
  util.assert(machineGun.getFireTimer() != 0.0);

  //Clear and check if the time has been reset
  machineGun.clear();
  util.assert(machineGun.getFireTimer() == 0.0);
}

{ //Test onFireStart and onFireStop events
  let util = Util.create();
  let bulletFactory = {
    fromDataCounter: 0,
    fromData(position, direction) {
      this.fromDataCounter++;
      return {
        updatePosition(elapsedTimeSecond) {}
      };
    }
  };
  let ship = {
    getPosition() { },
    getDirection() { }
  };
  let drawObjectManager = {
    add() { },
    remove() { }
  };

  let gameObjectDrawObjectFactory = {
    create(drawObject, bullet) {
      return {
        getGameObject() {
          return bullet;
        }
      };
    }
  };

  let machineGun = MachineGunFactory.create(bulletFactory, drawObjectManager, gameObjectDrawObjectFactory)
      .createMachineGun(ship);

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
