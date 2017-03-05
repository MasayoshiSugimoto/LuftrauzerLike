"use strict";

const Faction = {
  create() {
    return Object.assign({
      actors: new Map(),
    }, this.proto);
  },
  proto: {
    set(actor, faction) {
      this.actors.set(actor, faction);
    },
    isEnemy(actor1, actor2) {
      return this.actors.get(actor1) != this.actors.get(actor2);
    },
  }
};
