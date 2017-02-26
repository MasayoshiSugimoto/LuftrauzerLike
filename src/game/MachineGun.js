"use strict";

const MACHINE_GUN_FIRE_RATE_INTERVAL_SECOND = 0.1; //Time between bullets in seconds

const MachineGun = {

  create(ship, machineGunFactoryIn) {

    return Object.assign({
        fireTimer               : 0.0,
        bullets                 : [],
        ship                    : ship,
        machineGunFactory       : machineGunFactoryIn,
        updateFunction          : this.proto.clear,
        image                   : machineGunFactoryIn.getImages().get('images/Explosion.png'),
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
      let bullet = this.machineGunFactory.bulletFactory.create();

      //Add bullets
      let drawObject = this.machineGunFactory.gameObjectDrawObjectFactory
          .create(
              this.machineGunFactory.getImageDrawObjectFactory().create(this.image).setScale(0.5),
              bullet);
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
  create(bulletFactoryIn, drawObjectManagerIn, gameObjectDrawObjectFactoryIn, images, imageDrawObjectFactory) {
    return Object.assign(
      {
        bulletFactory                :  bulletFactoryIn,
        drawObjectManager            :  drawObjectManagerIn,
        gameObjectDrawObjectFactory  :  gameObjectDrawObjectFactoryIn,
        images                       :  images,
        imageDrawObjectFactory       :  imageDrawObjectFactory,
      },
      this.proto
    );
  },

  proto: {
    createMachineGun(ship) {
      const machinegun = MachineGun.create(ship, this);
      this.bulletFactory.setWeapon(machinegun);
      return machinegun;
    },

    getImages() {
      return this.images;
    },

    getImageDrawObjectFactory() {
      return this.imageDrawObjectFactory;
    },
  }

};

