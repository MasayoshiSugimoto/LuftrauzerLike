"use strict";

const ENEMY_POPPER_MARGIN_METER = 3.0;

const EnemyPopper = {
  create(enemyFactory, windowObject, camera) {
    let enemyManager = Object.assign( {
      enemyFactory  :  enemyFactory,
      windowObject  :  windowObject,
      camera        :  camera,
      enemyCounter  :  0,
    }, this.proto);
    windowObject.setInterval( () => { enemyManager.createEnemy(); }, 1000 /*milliseconds*/);
    return enemyManager;
  },
  proto: {
    createEnemy() {
      const enemy = this.enemyFactory.create();
      let popOffset = Vector2D.zero();
      const center = this.camera.getSize().scalarMultiply(0.5);
      const xOffset = center.getX() + ENEMY_POPPER_MARGIN_METER;
      const yOffset = center.getY() + ENEMY_POPPER_MARGIN_METER;
      switch (this.enemyCounter) {
        case 0:
          popOffset = Vector2D.create(-xOffset, 0.0);
          break;
        case 1:
          popOffset = Vector2D.create(0.0, -yOffset);
          break;
        case 2:
          popOffset = Vector2D.create(xOffset, 0.0);
          break;
        case 3:
          popOffset = Vector2D.create(0.0, yOffset);
          break;
        default:
          throw "Invalid enemyCounter";
      }
      enemy.setPosition(this.camera.getPosition().add(center).add(popOffset));

      //Update the counter
      this.enemyCounter++;
      if (this.enemyCounter >= 4) {
        this.enemyCounter = 0;
      }
      return enemy;
    },
  }
};
