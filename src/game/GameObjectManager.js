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
    clean() {
      this.gameObjects = this.gameObjects.filter( (gameObject) => {
          return !gameObject.toDelete();
        } );
      return this;
    },
    forEach(callback) {
      this.gameObjects.forEach(callback);
      return this;
    },
  }
};
