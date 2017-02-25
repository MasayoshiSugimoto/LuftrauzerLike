"use strict";

{ //Test 'increment'
  const util = Util.create();

  const time = {
    milliseconds: 0,
    getCurrentTimeMillisecond() {
      return this.milliseconds;
    },
  };

  const documentObject = {
    div: { },
    getElementById(id) {
      util.assert(id == "debug");
      return this.div;
    }
  };

  const frameCounter = FrameCounter.create(time, documentObject);

  time.milliseconds = 250;
  frameCounter.increment();
  util.assert(documentObject.div.textContent == null);
  time.milliseconds = 500;
  frameCounter.increment();
  util.assert(documentObject.div.textContent == null);
  time.milliseconds = 750;
  frameCounter.increment();
  util.assert(documentObject.div.textContent == null);
  time.milliseconds = 1000;
  frameCounter.increment();
  util.assert(documentObject.div.textContent == null);
  time.milliseconds = 1250;
  frameCounter.increment();
  util.assert(documentObject.div.textContent == "Frame per second = 4");
}
