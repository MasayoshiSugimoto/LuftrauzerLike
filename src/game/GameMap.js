"use strict";

const GAME_MAP_HALF_SIZE_METER = 10.0;

const GameMap = () => {
  return {
    getWidthMeter() {
      return 2 * GAME_MAP_HALF_SIZE_METER;
    },
    getHeightMeter() {
      return 2 * GAME_MAP_HALF_SIZE_METER;
    },
    getSize() {
      return Vector2D.create(this.getWidthMeter(), this.getHeightMeter());
    },
    getPosition() {
      return Vector2D.create(-GAME_MAP_HALF_SIZE_METER, -GAME_MAP_HALF_SIZE_METER);
    },
    isInside(vector) {
      return vector.getX() >= -GAME_MAP_HALF_SIZE_METER
          && vector.getX() <= GAME_MAP_HALF_SIZE_METER
          && vector.getY() >= -GAME_MAP_HALF_SIZE_METER
          && vector.getY() <= GAME_MAP_HALF_SIZE_METER;
    },
    getBottom() {
      return GAME_MAP_HALF_SIZE_METER;
    },
  };
};

