"use strict";

const SHIP_VELOCITY_MAX    = 4; //Velocity in meter/second
const SHIP_ROTATION_UNIT   = Math.PI * 2; //Rotation allowed per frame
const SHIP_BOOST_UNIT      = 0.1; //Velocity in meter/second

const Ship = {

  create() {
    let ship = {
      isBoost    :  false,
      isLeft     :  false,
      isRight    :  false,
      position   :  Vector2D.create(0,0), //Game coordinates in meter
      direction   :  0, //Angle in radian
      velocity   :  Vector2D.create(0,0), //Velocity in meter/second
      hp         :  10, //Starting HP
    };
    return Object.assign(ship, this.proto, GameSpacePositionableComposite(ship), Disposable(ship));
  },

  proto: {

    setVelocity(velocity) {
      this.velocity = velocity;
      return this;
    },

    getVelocity() {
      return this.velocity;
    },

    updatePosition(elapsedTime /*frame duration in second*/) {
      //Update velocity
      this.velocity = (GRAVITY_VECTOR.scalarMultiply(elapsedTime))
        .add(this.velocity)
        .cut(SHIP_VELOCITY_MAX);
      //Update position
      this.setPosition(this.getPosition()
        .add(this.velocity.scalarMultiply(elapsedTime)));
        return this;
    },

    updateControl(elapsedTime /*frame duration in second*/) {

      //Update direction
      if (this.isLeft) {
        this.setDirection(
          this.getDirection() - (SHIP_ROTATION_UNIT * elapsedTime));
      } else if (this.isRight) {
        this.setDirection(
          this.getDirection() + (SHIP_ROTATION_UNIT * elapsedTime));
      }

      //Update boost
      if (this.isBoost) {
        this.velocity = this.velocity.add(
          Vector2D.create(SHIP_BOOST_UNIT * elapsedTime,0).rotate(this.getDirection()));
      }

      return this;
    },

    update(elapsedTime) {
      if (!this.isDead()) {
        this.updateControl(elapsedTime).updatePosition(elapsedTime);
      }
      return this;
    },

    collide() {
      this.hp--;
      this.hp = Math.max(this.hp, 0);
      if (this.isDead()) {
        this.markForDeletion();
      }
      return this;
    },

    isDead() {
      return this.hp <= 0;
    },

    getRadius() {
      return 0.5;
    },

    isCollisionable() {
      return !this.isDead();
    }
  }

};

const ShipFactory = (gameObjectManager) => {
  return {
    gameObjectManager: gameObjectManager,
    createShip() {
      let ship = Ship.create();
      this.gameObjectManager.push(ship);
      return ship;
    }
  };
};
