"use strict";

{ //Test the 'create' function
  const util = Util.create();

  const position = Vector2D.create(1.0, 2.0);
  const direction = 3.0;
  const inertiaVectorMeterPerSecond = Vector2D.create(4.0, 5.0);

  const bullet = Bullet.create(position, direction, inertiaVectorMeterPerSecond);

  util.assert(bullet.getPosition().equals(position));
  util.assert(direction == bullet.getDirection());
}

{ //Test 'updatePosition'. Move 1 meter to the right.
  const util = Util.create();

  const position = Vector2D.zero();
  const direction = 0.0;
  const inertiaVectorMeterPerSecond = Vector2D.zero();

  const bullet = Bullet.create(position, direction, inertiaVectorMeterPerSecond)
      .updatePosition(1.0 /* duration in second */);

  util.assert(bullet.getPosition().getX() == 6.0);
  util.assert(bullet.getPosition().getY() == 0.0);
}


{ //Test 'updatePosition'. Move 1 meter down left.
  const util = Util.create();

  const position = Vector2D.zero();
  const direction = -2.0 * Math.PI / 3.0;
  const inertiaVectorMeterPerSecond = Vector2D.zero();

  const bullet = Bullet.create(position, direction, inertiaVectorMeterPerSecond)
      .updatePosition(1.0 /* duration in second */);

  util.assert(bullet.getPosition().getX() < 0.0);
  util.assert(bullet.getPosition().getY() < 0.0);
  util.assert(util.compareFloat(bullet.getPosition().distance(), 6.0));
}
