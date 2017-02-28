"use strict";

{ //Test "BulletCompositeFactory"
  const util = Util.create();

  const bullet = { };
  const bulletFactory = {
    create() {
      return bullet;
    },
  };

  const explosion = { };
  const explosionFactory = {
    create() {
      return explosion;
    },
  };

  const gameObjectDrawObjectFactory = {
    create(drawObject, gameObject) {
      return {
        getGameObject() { return gameObject; },
        getDrawObject() { return drawObject; },
      };
    }
  };

  const bulletComposite = BulletCompositeFactory(bulletFactory, explosionFactory, gameObjectDrawObjectFactory)
      .create();

  util.assert(bullet == bulletComposite.getGameObject());
  util.assert(explosion == bulletComposite.getDrawObject());
}
