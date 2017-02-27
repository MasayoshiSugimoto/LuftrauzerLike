"use strict";

function MachineGunTest() {
};

MachineGunTest.explosionImage = { };
MachineGunTest.images = new Map();
MachineGunTest.images.set('images/Explosion.png', MachineGunTest.explosionImage);

{ //Test that no bullet is created before the fire timer
  const util = Util.create();

  const ship = {
    position: { },
    direction: { }
  };

  const machineGunFactory = {
    image: { },
    bulletFactory: {
      isFromDataCalled: false,
      fromData(position, direction) {
        this.isFromDataCalled = true;
        util.assert(position == ship.position);
        util.assert(direction == ship.direction);
      },
    },
    getImages() {
      const images = new Map();
      images.set('images/Explosion.png', this.image);
      return images;
    },
  };

  const machineGun = MachineGun.create(ship, machineGunFactory);

  machineGun.fire(0.01 /*second*/);
  util.assert(!machineGunFactory.bulletFactory.isFromDataCalled);
}

{ //Test that a bullet is created at the fire rate
  const util = Util.create();

  //Create bullet
  const bullet = { };


  //Create bullet factory
  const bulletFactory = {
    setWeapon(weapon) {
    },
    create() {
      return bullet;
    },
  };

  const expectedDrawObjectGameObject = { };

  //Create drawObjectManager
  const drawObjectManager = {
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
  const ship = {
    getPosition() { },
    getDirection() { }
  };

  const imageDrawObjectFactory = {
    image: {
      setScale(scale){
        util.assert(scale == 0.5);
        return this;
      }
    },
    create(image) {
      util.assert(MachineGunTest.images.get('images/Explosion.png') == image);
      return this.image;
    }
  };

  const gameObjectDrawObjectFactory = {
    create(drawObject, gameObject) {
      util.assert(drawObject == imageDrawObjectFactory.image);
      util.assert(gameObject == bullet);
      return expectedDrawObjectGameObject;
    }
  };

  //Create machinegun
  const machineGun = MachineGunFactory.create(
          bulletFactory,
          drawObjectManager,
          gameObjectDrawObjectFactory,
          MachineGunTest.images,
          imageDrawObjectFactory)
      .createMachineGun(ship);

  //Fire for 0.09 second and check that the first bullet is not created
  machineGun.fire(0.09);
  util.assert(drawObjectManager.addDrawObjectCounter == 0);
  util.assert(machineGun.getBulletsLength() == 0);

  //Fire for 0.01 second and check that no bullet has been created.
  machineGun.fire(0.01 + EPSILON);
  util.assert(drawObjectManager.addDrawObjectCounter == 1);
  util.assert(machineGun.getBulletsLength() == 1);

  //Fire for another 0.1 second and check that the second bullet has been created.
  machineGun.fire(0.1 + EPSILON);
  util.assert(machineGun.getBulletsLength() == 2);
  util.assert(drawObjectManager.addDrawObjectCounter == 2);

  //Wait for the object to be deleted.
  setTimeout( () => {
      util.assert(machineGun.getBulletsLength() == 0);
      util.assert(drawObjectManager.removeCounter == 2);
    }, 5500 /* milliseconds */ );
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
        updatePosition(elapsedTimeSecond) {}
      };
    },

    setWeapon(weapon) { }

  };

  const ship = {
    getPosition() { },
    getDirection() { }
  };
  const drawObjectManager = {
    add() { },
    remove() { }
  };

  const gameObjectDrawObjectFactory = {
    create(drawObject, bullet) {
      return {
        getGameObject() {
          return bullet;
        }
      };
    }
  };

  const imageDrawObjectFactory = {
    imageDrawObject: {
      setScale(scale) {
        util.assert(scale == 0.5);
        return this;
      }
    },
    create(image) {
      util.assert(image == MachineGunTest.images.get('images/Explosion.png'));
      return this.imageDrawObject;
    }
  };

  const machineGun = MachineGunFactory.create(
          bulletFactory,
          drawObjectManager,
          gameObjectDrawObjectFactory,
          MachineGunTest.images,
          imageDrawObjectFactory)
      .createMachineGun(ship);

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

  const bulletFactory = {
    weapon: null,
    setWeapon(weapon) {
      this.weapon = weapon;
    }
  };

  const drawObjectManager = {
  };

  const gameObjectDrawObjectFactory = {
  };

  const ship = {
  };

  const imageDrawObjectFactory = { };

  const machineGunFactory = MachineGunFactory.create(
      bulletFactory,
      drawObjectManager,
      gameObjectDrawObjectFactory,
      MachineGunTest.images,
      imageDrawObjectFactory)

  util.assert(bulletFactory == machineGunFactory.bulletFactory);
  util.assert(drawObjectManager == machineGunFactory.drawObjectManager);
  util.assert(gameObjectDrawObjectFactory == machineGunFactory.gameObjectDrawObjectFactory);
  const machinegun = machineGunFactory.createMachineGun(ship);
  util.assert(machinegun == bulletFactory.weapon);
}
