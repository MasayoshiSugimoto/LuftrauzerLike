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
          imageDrawObjectFactory.create(images.get('images/Reisen.png')),
          ship)
        .setScale(0.5);
      gameObjectManager.push(shipComposite);
      drawObjectManager.add(shipComposite);
      faction.setGoodFaction(shipComposite);
      return shipComposite;
    },
  };
};
