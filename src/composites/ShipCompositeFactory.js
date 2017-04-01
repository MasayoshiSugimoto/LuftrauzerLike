"use strict";

const ShipCompositeFactory = (
    ship,
    imageDrawObjectFactory,
    gameObjectDrawObjectFactory,
    gameObjectManager,
    drawObjectManager,
    faction,
    images) => {
  return {
    create() {
      const shipComposite = gameObjectDrawObjectFactory.create(
          AnimationDrawObject.create(ReisenImages(images).get(), ship),
          ship)
        .setScale(1.0);
      gameObjectManager.push(shipComposite);
      drawObjectManager.add(shipComposite);
      faction.setGoodFaction(shipComposite);
      return shipComposite;
    },
  };
};
