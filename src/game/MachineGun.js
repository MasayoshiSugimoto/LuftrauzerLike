"use strict";

const MACHINE_GUN_FIRE_RATE_INTERVAL_SECOND = 0.05; //Time between bullets in seconds

const MachineGun = {

  create(ship, machineGunFactoryIn) {

    return Object.assign({
        fireTimer          : 0.0,
        bullets            : [],
        ship               : ship,
        machineGunFactory : machineGunFactoryIn,
        updateFunction    : this.proto.clear,
      },
      this.proto
    );

  },

  proto: {

    getBulletsLength() {
      return this.bullets.length;
    },

    getFireTimer() {
      return this.fireTimer;
    },

    fire(elapsedTimeSecond) {
      this.fireTimer += elapsedTimeSecond;

      if (this.fireTimer < MACHINE_GUN_FIRE_RATE_INTERVAL_SECOND) {
        return;
      }

      this.fireTimer = 0.0;
      let bullet = this.machineGunFactory.bulletFactory.fromData(
        this.ship.getPosition(), this.ship.getDirection());

      //Add bullets
      let drawObject = this.machineGunFactory.gameObjectDrawObjectFactory
          .create(SHAPE_MAP.get("bullet"), bullet);
      this.bullets.push(drawObject);
      this.machineGunFactory.drawObjectManager.add(drawObject);

      //Set an event to delete the bullets after some time
      let that = this;
      setTimeout(
        () => {
          that.bullets = that.bullets.filter( (b) => { return b != drawObject; } );
          that.machineGunFactory.drawObjectManager.remove(drawObject);
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

      this.bullets.forEach( function(bullet) {
        bullet.getGameObject().updatePosition(elapsedTimeSecond);
      } );
    }

  }

};

const MachineGunFactory = {
  create(bulletFactoryIn, drawObjectManagerIn, gameObjectDrawObjectFactoryIn) {
    return Object.assign(
      {
        bulletFactory                :  bulletFactoryIn,
        drawObjectManager            :  drawObjectManagerIn,
        gameObjectDrawObjectFactory  :  gameObjectDrawObjectFactoryIn,
      },
      this.proto
    );
  },

  proto: {
    createMachineGun(ship) {
      return MachineGun.create(ship, this);
    },
  }

};

