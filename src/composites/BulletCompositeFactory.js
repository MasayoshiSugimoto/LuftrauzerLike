"use strict";

//This is a top most factory, it should take care of the registration in drawObject manager and gameObject manager.
const BulletCompositeFactory = (
    bulletFactory,
    explosionFactory,
    gameObjectDrawObjectFactory,
    gameObjectManager,
    drawObjectManager,
    faction) => {
  return {
    create() {
      const explosion = explosionFactory.create().setScale(0.5);
      const gameObjectDrawObject = gameObjectDrawObjectFactory.create(explosion, bulletFactory.create());
      gameObjectManager.push(gameObjectDrawObject);
      drawObjectManager.add(gameObjectDrawObject);
      faction.setGoodFaction(gameObjectDrawObject);
      return gameObjectDrawObject;
    },
    dispose(bulletComposite) {
      gameObjectManager.remove(bulletComposite);
      drawObjectManager.remove(bulletComposite);
      return this;
    },
  };
};
