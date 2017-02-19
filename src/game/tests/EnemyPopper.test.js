"use strict";

{ //Test 'EnemyPopper'
  let util = Util.create();

  let windowObject = {
    setInterval(callback, timeMilliseconds) {
      util.assert(timeMilliseconds == 1000);
      callback();
    }
  };

  let expectedEnemy = {
    created: false
  };

  let enemyFactory = {
    create() {
      expectedEnemy.created = true;
      return expectedEnemy;
    }
  };

  let enemyPopper = EnemyPopper.create(enemyFactory, windowObject);

  util.assert(expectedEnemy.created);
}
