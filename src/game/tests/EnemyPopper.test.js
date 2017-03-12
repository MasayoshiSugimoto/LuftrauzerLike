"use strict";

{ //Test 'EnemyPopper'
  const util = Util.create();

  const windowObject = {
    setInterval(callback, timeMilliseconds) {
      util.assert(timeMilliseconds == 1000);
      callback();
    }
  };

  const expectedEnemy = {
    created: false,
    setPosition() { },
  };

  const enemyFactory = {
    create() {
      expectedEnemy.created = true;
      return expectedEnemy;
    }
  };

  const camera = {
    getSize() {
      return Vector2D.create(1.0, 2.0);
    },
    getPosition() {
      return Vector2D.zero();
    },
  };

  const enemyPopper = EnemyPopper.create(enemyFactory, windowObject, camera);

  util.assert(expectedEnemy.created);
}

{ //Test that enemies are created outside of the camera.
  const util = Util.create();

  const enemyFactory = {
    create() {
      return {
        setPosition(position) {
          this.position = position;
          return this;
        },
        getPosition() {
          return this.position;
        },
      };
    },
  };

  const windowObject = {
    setInterval(callback, durationMillisecond) {
      for(let counter = 0; counter < 10; counter++) {
        callback();
      }
    },
  };

  const camera = {
    isVisible(actor) {
      const position = actor.getPosition();
      if (position.getX() < camera.getPosition().getX()) {
        return false;
      }
      if (position.getX() > (camera.getPosition().getX() + camera.getSize().getX())) {
        return false;
      }
      if (position.getY() < camera.getPosition().getY()) {
        return false;
      }
      if (position.getY() > (camera.getPosition().getY() + camera.getSize().getY())) {
        return false;
      }
      return true;
    },
    getPosition() {
      return Vector2D.create(10.0, 20.0);
    },
    getSize() {
      return Vector2D.create(1.0, 2.0);
    },
  };

  const popper = EnemyPopper.create(enemyFactory, windowObject, camera);

  for (let index = 0; index < 10; index++) {
    const enemy = popper.createEnemy();
    util.assert(!camera.isVisible(enemy));
  }
}
