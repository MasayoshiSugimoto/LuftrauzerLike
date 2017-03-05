"use strict";

{ //Test 'create'
  const util = Util.create();

  const faction = Faction.create();

  const ship = {};
  const enemy1 = {};
  const enemy2 = {};

  faction.set(ship, "good");
  faction.set(enemy1, "bad");
  faction.set(enemy2, "bad");

  util.assert(faction.isEnemy(ship, enemy1));
  util.assert(!faction.isEnemy(enemy1, enemy2));
}
