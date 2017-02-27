"use strict";

const GameObjectManager = {

  create() {
    return Object.assign({
        gameObjects: [],
      }, this.proto);
  },

  proto: {
    push(gameObject) {
      this.gameObjects.push(gameObject);
      return this;
    },
    filter(callback) {
      return this.gameObjects.filter(callback);
    },
    update(elapsedTimeSecond) {
      //Clean the gameObject list.
      this.gameObjects = this.gameObjects.filter( (gameObject) => {
          return !gameObject.toDelete();
        } );

      //Update the gameObjects.
      this.forEach( (gameObject) => {
        gameObject.update(elapsedTimeSecond);
      } );

      return this;
    },
    forEach(callback) {
      return this.gameObjects.forEach(callback);
    },
    length() {
      return this.gameObjects.length;
    },
  }
};
