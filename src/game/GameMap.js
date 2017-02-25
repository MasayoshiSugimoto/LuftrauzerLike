"use strict";

const GameMap = {

  create(gameObjectManager) {
    return Object.assign({gameObjectManager: gameObjectManager}, this.proto);
  },

  getXSizeMeter() {
    return 10;
  },

  getYSizeMeter() {
    return 10;
  },

  proto: {

    getSize() {
      return Vector2D.create(GameMap.getXSizeMeter(), GameMap.getYSizeMeter());
    },

    getXSizeMeter() {
      return GameMap.getXSizeMeter();
    },

    getYSizeMeter() {
      return GameMap.getYSizeMeter();
    },

    //Keep an object inside the map
    keepInMap(gameObject) {
      let position = gameObject.getPosition();
      let x = position.getX();
      let y = position.getY();

      if (position.getX() > this.getXSizeMeter()) {
        x = this.getXSizeMeter();
      }
      if (position.getX() < -this.getXSizeMeter()) {
        x = -this.getXSizeMeter();
      }
      if (position.getY() > this.getYSizeMeter()) {
        y = this.getYSizeMeter();
      }
      if (position.getY() < -this.getYSizeMeter()) {
        y = -this.getYSizeMeter();
      }
      gameObject.setPosition(Vector2D.create(x, y));
      return this;
    },

    keepAllGameObjectsInMap() {
      this.gameObjectManager.forEach( (gameObject) => {
        this.keepInMap(gameObject);
      } );
    }

  }

};
