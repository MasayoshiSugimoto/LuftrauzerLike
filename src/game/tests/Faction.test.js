"use strict";

const FactionTest = {
  dummyFaction: {
    setGoodFaction(actor) {
      this.goodFactionActor = actor;
    },
    setBadFaction(actor) {
      this.badFactionActor = actor;
    },
  },
};

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

{ //Test 'setGoodFaction'/'setBadFaction'
  const util = Util.create();

  const faction = Faction.create();
  faction.setGoodFaction("goodGuy");
  faction.setGoodFaction("goodGirl");
  faction.setBadFaction("badGuy");
  faction.setBadFaction("badGirl");

  util.assert(faction.isEnemy("goodGuy", "badGuy"));
  util.assert(!faction.isEnemy("goodGuy", "goodGirl"));
  util.assert(!faction.isEnemy("badGuy", "badGirl"));
}
