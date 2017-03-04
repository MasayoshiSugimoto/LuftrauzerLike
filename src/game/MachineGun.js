"use strict";

const MACHINE_GUN_FIRE_RATE_INTERVAL_SECOND = 0.1; //Time between bullets in seconds

const MachineGun = {

  create(ship, machineGunFactoryIn) {

    return Object.assign({
        fireTimer               : 0.0,
        ship                    : ship,
        machineGunFactory       : machineGunFactoryIn,
        updateFunction          : this.proto.clear,
      },
      this.proto
    );

  },

  proto: {

    getFireTimer() {
      return this.fireTimer;
    },

    fire(elapsedTimeSecond) {
      this.fireTimer += elapsedTimeSecond;

      if (this.fireTimer < MACHINE_GUN_FIRE_RATE_INTERVAL_SECOND) {
        return;
      }

      this.fireTimer = 0.0;
      let bullet = this.machineGunFactory.getBulletFactory()
        .create()
        .setPosition(this.ship.getPosition())
        .setDirection(this.ship.getDirection());

      //Set an event to delete the bullets after some time
      let that = this;
      this.machineGunFactory.getWindowObject().setTimeout(
        () => {
          that.machineGunFactory.getBulletFactory().dispose(bullet);
        },
        5000 /*Life time of the bullet created in millisecond.*/
      );
    },

    clear(elapsedTime) {
      this.fireTimer = 0.0;
    },

    onFireStart() {
      this.updateFunction = this.fire;
    },

    onFireStop() {
      this.updateFunction = this.clear;
    },

    update(elapsedTimeSecond) {
      this.updateFunction(elapsedTimeSecond);
    },

    getPosition() {
      return this.ship.getPosition();
    },

    getDirection() {
      return this.ship.getDirection();
    },

  }

};

const MachineGunFactory = {
  create(bulletCompositeFactory, windowObject) {
    return Object.assign(
      {
        bulletCompositeFactory :  bulletCompositeFactory,
        windowObject           :  windowObject,
      },
      this.proto
    );
  },

  proto: {
    createMachineGun(ship) {
      return MachineGun.create(ship, this, this.windowObject);
    },

    getBulletFactory() {
      return this.bulletCompositeFactory;
    },

    getWindowObject() {
      return this.windowObject;
    },
  }

};

