"use strict";

function MachineGunTest() {
};

MachineGunTest.explosionImage = { };
MachineGunTest.images = new Map();
MachineGunTest.images.set('images/Explosion.png', MachineGunTest.explosionImage);

MachineGunTest.emptyShip = {
  getPosition() { },
  getDirection() { },
};

MachineGunTest.emptyBullet = {
  setDirection() { return this; },
  setPosition() { return this; },
};

MachineGunTest.emptyWindowObject = {
  setTimeout() { },
};

{ //Test that no bullet is created before the fire timer
  const util = Util.create();

  const ship = {
    position: { },
    direction: { }
  };

  const machineGunFactory = {
    image: { },

    bulletFactory: {
      create() {
        this.created = true;
        return { };
      }
    },

  };

  const machineGun = MachineGun.create(ship, machineGunFactory);

  machineGun.fire(0.01 /*second*/);
  util.assert(!machineGunFactory.bulletFactory.created);
}

{ //Test that a bullet is created at the fire rate
  const util = Util.create();

  //Create ship
  const ship = {
    getPosition() { },
    getDirection() { }
  };

  const bullet = {
    setPosition() { return this; },
    setDirection() { return this; },
  };

  const bulletCompositeFactory = {
    counter: 0,
    create() {
      this.counter++;
      return bullet;
    },
  };

  const windowObject = {
    setTimeout() { }
  };

  //Create machinegun
  const machineGun = MachineGunFactory.create(bulletCompositeFactory, windowObject).createMachineGun(ship);

  //Fire for 0.09 second and check that the first bullet is not created
  machineGun.fire(0.09);
  util.assert(bulletCompositeFactory.counter == 0);

  //Fire for 0.01 second and check that no bullet has been created.
  machineGun.fire(0.01 + EPSILON);
  util.assert(bulletCompositeFactory.counter == 1);

  //Fire for another 0.1 second and check that the second bullet has been created.
  machineGun.fire(0.1 + EPSILON);
  util.assert(bulletCompositeFactory.counter == 2);

}

{ //Test that the bullets are cleared after the end of the timer
  const util = Util.create();

  const ship = {
    getPosition() { },
    getDirection() { },
  };

  const windowObject = {
    setTimeout(callback, timeMillisecond) {
      //Check time validity
      util.assert(1000 <= timeMillisecond);
      this.callback = callback;
    }
  };

  const bullet = {
    setPosition() {
      return this;
    },
    setDirection() {
      return this;
    },
  };

  const bulletFactory = {
    create() {
      return bullet;
    },
    dispose(object) {
      //Check that the object deleted is the correct one.
      util.assert(bullet == object);
      machineGunFactory.called = true;
      return this;
    },
  };

  const machineGunFactory = {
    getBulletFactory() {
      return bulletFactory;
    },
    getWindowObject() {
      return windowObject;
    },
  };

  const machineGun = MachineGun.create(ship, machineGunFactory);
  //Wait some time
  machineGun.fire(1.0); 

  //Confirm that the created object is deleted when the time comes
  windowObject.callback();
  util.assert(machineGunFactory.called);
}

{ //Test clear function
  const util = Util.create();

  const machineGunFactory = {
    getImages() {
      return MachineGunTest.images;
    },
  };

  const ship = {
  };

  const machineGun = MachineGun.create(ship, machineGunFactory);

  //Fire for 0.01 seconds
  machineGun.fire(0.01);
  util.assert(machineGun.getFireTimer() != 0.0);

  //Clear and check if the time has been reset
  machineGun.clear();
  util.assert(machineGun.getFireTimer() == 0.0);
}

{ //Test onFireStart and onFireStop events
  const util = Util.create();

  const bulletFactory = {

    createCounter: 0,
    create() {
      this.createCounter++;
      return {
        updatePosition(elapsedTimeSecond) {},
        setPosition() { return this; },
        setDirection() { return this; },
      };
    },

    setWeapon(weapon) { }

  };

  const ship = {
    getPosition() { },
    getDirection() { }
  };

  const machineGunFactory = {
    getBulletFactory() {
      return bulletFactory;
    },
    getWindowObject() {
      return {
        setTimeout() { }
      };
    },
  };

  const machineGun = MachineGun.create(ship, machineGunFactory);

  //Update more than 1 second and check than no bullet has been fired.
  machineGun.update(1.1 /* second */);
  util.assert(bulletFactory.createCounter == 0);

  //Raise fire start event.
  machineGun.onFireStart();

  //Update more than 1 second and check that a bullet has been fired.
  machineGun.update(1.1 /* second */);
  util.assert(bulletFactory.createCounter == 1);

  //Raise fire stop event.
  machineGun.onFireStop();
  util.assert(bulletFactory.createCounter == 1);

  //Update more than 1 second and check than no bullet has been fired.
  machineGun.update(1.1 /* second */);

  //Raise fire start event.
  machineGun.onFireStart();

  //Update more than 1 second and check that a bullet has been fired.
  machineGun.update(1.1 /* second */);
  util.assert(bulletFactory.createCounter == 2);
}

{ // Test 'MachineGunFactory.createMachineGun'
  const util = Util.create();

  const machineGunFactory = MachineGunFactory.create("bulletCompositeFactory", "windowObject");
  
  util.assert(machineGunFactory.getBulletFactory() == "bulletCompositeFactory");
  util.assert(machineGunFactory.getWindowObject() == "windowObject");
}

{ //Test that bullets are correctly created.
  const util = Util.create();

  const windowObject = {
    setTimeout(callback, timeMillisecond) {
    },
  };

  const machineGunFactory = {
    bulletFactory: {
      create() {
        this.called = true;
        return MachineGunTest.emptyBullet;
      }
    },
    getBulletFactory() {
      return this.bulletFactory;
    },
    getWindowObject() {
      return {
        setTimeout() { }
      };
    },
  };

  const machineGun = MachineGun.create(MachineGunTest.emptyShip, machineGunFactory);

  machineGun.fire(1.0);
  util.assert(machineGunFactory.bulletFactory.called);
}

{ //Test that the bullet initialize its position from the ship.
  const util = Util.create();

  const ship = {
    getPosition() {
      return "position";
    },
    getDirection() {
      return "direction";
    },
  };

  const bullet = {
    setPosition(position) {
      this.position = position;
      return this;
    },
    setDirection(direction) {
      this.direction = direction;
      return this;
    },
  };

  const bulletFactory = {
    create() {
      return bullet;
    },
  };

  const machineGunFactory = {
    getBulletFactory() {
      return bulletFactory;
    },
    getWindowObject() {
      return MachineGunTest.emptyWindowObject;
    },
  };

  const machineGun = MachineGun.create(ship, machineGunFactory).fire(100.0);

  util.assert("position" == bullet.position);
  util.assert("direction" == bullet.direction);
}
