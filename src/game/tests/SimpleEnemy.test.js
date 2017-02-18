"use strict";

const TestSimpleEnemy = {
	util: Util.create()
};

{ //Test newDirection max rotation on left side
	let target = {
		getPosition() {
			return Vector2D.create(1.0, -2.0); //Target is just below the enemy
		}
	};

	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);

	enemy.setPosition(Vector2D.create(1.0, 2.0));
	enemy.setDirection(0.6 * Math.PI);

	TestSimpleEnemy.util.assertEqualFloat(
		-0.9 * Math.PI,
		enemy.newDirection(0.5 /* elapsed time in second */));
}

{ //Test newDirection max rotation on right side
	let target = {
		getPosition() {
			return Vector2D.create(1.0, -2.0); //Target is just below the enemy
		}
	};

	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);

	enemy.setPosition(Vector2D.create(1.0, 2.0));
	enemy.setDirection(0.4 * Math.PI);

	TestSimpleEnemy.util.assertEqualFloat(
		-0.1 * Math.PI,
		enemy.newDirection(0.5 /* elapsed time in second */));
}

{ //Test newDirection small rotation
	let target = {
		getPosition() {
			return Vector2D.create(1.0, -2.0); //Target is just below the enemy
		}
	};

	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);

	enemy.setPosition(Vector2D.create(1.0, 2.0));
	enemy.setDirection(0.4 * Math.PI);

	TestSimpleEnemy.util.assertEqualFloat(
		-0.5 * Math.PI,
		enemy.newDirection(2.0 /* elapsed time in second */));
}

{ //Test newDirection close to the target
	let target = {
		getPosition() {
			return Vector2D.create(1.0, 2.0); //Target is just below the enemy
		}
	};

	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);

	enemy.setPosition(Vector2D.create(1.0, 2.0));
	enemy.setDirection(0.4 * Math.PI);

	TestSimpleEnemy.util.assertEqualFloat(
		0.4 * Math.PI,
		enemy.newDirection(2.0 /* elapsed time in second */));
}

{ //Test newPosition
	let target = {};
	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);
	enemy.setPosition(Vector2D.create(1.0, 2.0));

	//Move to the left
	let newPosition = enemy.newPosition(0.5 /* duration in second */, Math.PI);

	TestSimpleEnemy.util.assertEqualFloat(0.5, newPosition.getX());
	TestSimpleEnemy.util.assertEqualFloat(2.0, newPosition.getY());
}

{ //Test update
	let target = {
		getPosition() {
			return Vector2D.create(1.0, 2.0);
		}
	};
	let machineGun = {};
	let drawObject = {};

	let enemy = SimpleEnemy.create(target, machineGun, drawObject);
	enemy.setPosition(Vector2D.create(-1.0, 2.0));
	enemy.update(1.0 /* duration in second */);

	TestSimpleEnemy.util.assertEqualFloat(0.0, enemy.getPosition().getX());
}

{ //Test 'isDead'
  let util = Util.create();

  let enemy = SimpleEnemy.create({ }, { });
  util.assert(!enemy.isDead());
  util.assert(enemy.collide().isDead());
}
