"use strict";

{ //Test 'increment'
  const util = Util.create();

  const time = {
    milliseconds: 0,
    getCurrentTimeMillisecond() {
      return this.milliseconds;
    },
  };

  const debugMenu = {
    called: false,
    setFramePerSecond(framePerSecond) {
      util.assert(4 == framePerSecond);
      this.called = true;
    }
  };

  const frameCounter = FrameCounter.create(time, debugMenu);

  time.milliseconds = 250;
  frameCounter.increment();
  util.assert(!debugMenu.called);
  time.milliseconds = 500;
  frameCounter.increment();
  util.assert(!debugMenu.called);
  time.milliseconds = 750;
  frameCounter.increment();
  util.assert(!debugMenu.called);
  time.milliseconds = 1000;
  frameCounter.increment();
  util.assert(!debugMenu.called);
  time.milliseconds = 1250;
  frameCounter.increment();
  util.assert(debugMenu.called);
}
