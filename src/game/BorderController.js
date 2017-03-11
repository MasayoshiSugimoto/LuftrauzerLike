"use strict";

const BORDER_CONTROLLER_MAP_SIZE_METER = 10.0;

//Take control of the ship when getting outside of the map.
const BorderController = (controller) => {
  return {

    isBoost() {
      return this.isOutOfMap() || controller.isBoost();
    },

    isLeft() {
      if (!this.isOutOfMap()) {
        return controller.isLeft();
      }
      return this.autoDirection() == "left";
    },

    isRight() {
      if (!this.isOutOfMap()) {
        return controller.isRight();
      }
      return this.autoDirection() == "right";
    },

    setOnFireStartCallback(onFireStartCallback) {
      controller.setOnFireStartCallback(onFireStartCallback);
    },

    setOnFireStopCallback(onFireStopCallback) {
      controller.setOnFireStopCallback(onFireStopCallback);
    },

    isOutOfMap() {
      return this.ship.getPosition().getX() <= -BORDER_CONTROLLER_MAP_SIZE_METER
          || this.ship.getPosition().getX() >= BORDER_CONTROLLER_MAP_SIZE_METER
          || this.ship.getPosition().getY() <= -BORDER_CONTROLLER_MAP_SIZE_METER
          || this.ship.getPosition().getY() >= BORDER_CONTROLLER_MAP_SIZE_METER;
    },

    autoDirection() {
      //Rotation to do to be in direction of zero
      const rotation = Vector2D.zero()
          .substract(this.ship.getPosition())
          .getAngle()
          .substract(Angle.create(this.ship.getDirection()))
          .get();
      //We stop to turn when we are roughly in the good direction.
      if (Math.abs(rotation) < Math.PI / 10.0) {
        return "none";
      } else if (rotation >= 0.0) {
        return "right";
      } else {
        return "left";
      }
    },

    setShip(ship) {
      this.ship = ship;
    },
  };
};
