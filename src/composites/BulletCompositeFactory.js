"use strict";

const BulletCompositeFactory = (bulletFactory, explosionFactory, gameObjectDrawObjectFactory) => {
  return {
    create() {
      return gameObjectDrawObjectFactory.create(
          explosionFactory.create(),
          bulletFactory.create()
        );
    }
  };
};
