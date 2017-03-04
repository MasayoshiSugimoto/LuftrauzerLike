"use strict";

const EnemyPopper = {
  create(enemyFactory, windowObject) {
    let enemyManager = Object.assign( {
      enemyFactory  :  enemyFactory,
      windowObject  :  windowObject,
    }, this.proto);
    windowObject.setInterval( () => { enemyManager.createEnemy(); }, 1000 /*milliseconds*/);
    return enemyManager;
  },
  proto: {
    createEnemy() {
      let enemy = this.enemyFactory.create();
      return enemy;
    },
  }
};
