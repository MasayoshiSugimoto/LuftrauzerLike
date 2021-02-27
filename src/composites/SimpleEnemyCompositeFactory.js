"use strict";

function SimpleEnemyCompositeFactory (
    simpleEnemyFactory,
    imageDrawObjectFactory,
    gameObjectDrawObjectFactory,
    images,
    drawObjectManager) {
  return {
    create() {
      let simpleEnemyComposite = gameObjectDrawObjectFactory.create(
          imageDrawObjectFactory.create(images.get('images/Reisen.png')).setScale(0.6),
          simpleEnemyFactory.create());
      drawObjectManager.add(simpleEnemyComposite);
      return simpleEnemyComposite;
    }
  };
};
