"use strict";

{ //Test 'update'
  const util = Util.create();

  const canvas = {
      getGameSpaceCenter() {
        return Vector2D.create(1.0, 2.0);
      }
    };
  const subject = {
      getPosition() {
        return Vector2D.create(10.0, 20.0);
      }
    };

  const camera = Camera.create(canvas, subject).update();
  util.assertEqualFloat(9, camera.position.getX());
  util.assertEqualFloat(18, camera.position.getY());
}

