"use strict";

const SimpleEnemyCompositeFactory = (simpleEnemyFactory, imageDrawObjectFactory, gameObjectDrawObjectFactory, images) => {
  return {
    create() {
      return gameObjectDrawObjectFactory.create(
          imageDrawObjectFactory.create(images.get('images/Reisen.png')).setScale(0.4), 
          simpleEnemyFactory.create());
    }
  };
};
