"use strict";

{ //Test create
  let util = Util.create();

  let images = new Map();
  let expected = { };
  images.set('images/Explosion.png', expected);

  let explosion = ExplosionDrawObjectFactory(images).create();
  util.assert(explosion.image == expected);
}

{ //Test setScale, getSize, setOpacity, draw
  let util = Util.create();

  let images = new Map();
  let expected = {
    width: 10,
    height: 20
  };
  images.set('images/Explosion.png', expected);

  let explosion = ExplosionDrawObjectFactory(images).create()
      .setScale(2.0)
      .setOpacity(0.5)
  util.assertEqualFloat(20, explosion.getSize().getX());
  util.assertEqualFloat(40, explosion.getSize().getY());
  util.assertEqualFloat(0.5, explosion.opacity);

  //Test Draw
  let canvas = {
    called: false,
    globalAlpha: 3.0,
    drawImage(image, x, y, width, height) {
      util.assert(image == expected);
      util.assertEqualFloat(-10, x);
      util.assertEqualFloat(-20, y);
      util.assertEqualFloat(20, width);
      util.assertEqualFloat(40, height);
      this.called = true;
    }
  };
  util.assert(explosion.draw(canvas) == explosion);
  util.assertEqualFloat(3.0, canvas.globalAlpha);
  util.assert(canvas.called);
}
