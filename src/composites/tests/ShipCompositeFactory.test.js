"use strict";

const ShipCompositeTest = {

};

{ //Test ShipComposite
  const util = Util.create();

  const ship = {
    getDirection() { },
  };

  const gameObjectManager = {
    push(gameObject) {
      this.gameObject = gameObject;
      return this;
    },
  };

  const drawObjectManager = {
    add(drawObject) {
      this.drawObject = drawObject;
      return this;
    },
  };

  const imageDrawObject = { };
  const imageDrawObjectFactory = {
    create(image) {
      imageDrawObject.image = image;
      return imageDrawObject;
    }
  };

  const drawObjectGameObjectFactory = {
    create(drawObject, gameObject) {
      return {
        drawObject: drawObject,
        gameObject: gameObject,
        setScale(scale) {
          this.scale = scale;
          return this;
        }
      };
    }
  };

  const images = new Map();
  images.set("images/Reisen.png", "image");

  const shipComposite = ShipCompositeFactory(
        ship,
        imageDrawObjectFactory,
        drawObjectGameObjectFactory,
        gameObjectManager,
        drawObjectManager,
        FactionTest.dummyFaction,
        images)
      .create();

  util.assert(shipComposite.gameObject == ship);
  util.assert(1.0 == shipComposite.scale);
  util.assert(imageDrawObject.image = "image");
  util.assert(shipComposite == gameObjectManager.gameObject);
  util.assert(shipComposite == drawObjectManager.drawObject);
  util.assert(shipComposite == FactionTest.dummyFaction.goodFactionActor);
}
