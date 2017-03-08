"use strict";

{ //Test that the game loop is called infinitely
  const util = Util.create();

  const windowObject = {
    setTimeout(callback, timeoutMillisecond) {
      this.callback = callback;
      this.timeoutMillisecond = timeoutMillisecond;
    }
  };

  const time = { };
  time.getCurrentTimeMillisecond = () => { return 0; };

  let counter = 0;
  let callback = (elapsedTimeSecond) => {
    util.assert(0.001 == elapsedTimeSecond);
    counter++;
  };

  const gameLoop = GameLoop.create(windowObject, time).setGameLoop(callback);
  util.assert(null != windowObject.callback);  
  util.assert(GAME_LOOP_FRAME_TIME_MILLISECOND - GAME_LOOP_MARGIN_MILLISECOND == windowObject.timeoutMillisecond);
  const callbackCopy = windowObject.callback;
  windowObject.callback = null;
  time.getCurrentTimeMillisecond = () => { return 1.0; };
  callbackCopy();
  util.assert(1 == counter);
  util.assert(null != windowObject.callback);
  util.assertEqualFloat(15.66666, windowObject.timeoutMillisecond);
}
