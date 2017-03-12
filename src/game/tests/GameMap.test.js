"use strict";

{ //Test 'isInside'
  const util = Util.create();
  //Inside
  util.assert(GameMap().isInside(Vector2D.create(0.0, 0.0)));
  util.assert(GameMap().isInside(Vector2D.create(-GameMap().getWidthMeter() / 2.0, 0.0)));
  util.assert(GameMap().isInside(Vector2D.create(GameMap().getWidthMeter() / 2.0, 0.0)));
  util.assert(GameMap().isInside(Vector2D.create(0.0, -GameMap().getWidthMeter() / 2.0)));
  util.assert(GameMap().isInside(Vector2D.create(0.0, GameMap().getWidthMeter() / 2.0)));
  //Outside
  util.assert(!GameMap().isInside(Vector2D.create(-0.1 - GameMap().getWidthMeter() / 2.0, 0.0)));
  util.assert(!GameMap().isInside(Vector2D.create(0.1 + GameMap().getWidthMeter() / 2.0, 0.0)));
  util.assert(!GameMap().isInside(Vector2D.create(0.0, -0.1 - GameMap().getWidthMeter() / 2.0)));
  util.assert(!GameMap().isInside(Vector2D.create(0.0, 0.1 + GameMap().getWidthMeter() / 2.0)));
}
