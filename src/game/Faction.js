"use strict";

const Faction = {
  create() {
    return Object.assign({
      actors: new Map(),
    }, this.proto);
  },
  proto: {
    set(actor, factionName) {
      this.actors.set(actor, factionName);
    },
    isEnemy(actor1, actor2) {
      return this.actors.get(actor1) != this.actors.get(actor2);
    },
    setGoodFaction(actor) {
      this.actors.set(actor, "good");
      return this;
    },
    setBadFaction(actor) {
      this.actors.set(actor, "bad");
      return this;
    },
  }
};
