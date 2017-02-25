"use strict";

const FrameCounter = {
  create(time, documentObject) {
    return Object.assign({
      counter: 0,
      time: time,
      firstFrameTimeMillisecond: time.getCurrentTimeMillisecond(),
      lastFrameTimeMillisecond: time.getCurrentTimeMillisecond(),
      debugDiv: documentObject.getElementById("debug"),
    }, this.proto);
  },
  
  proto: {
    increment() {
      this.counter++;

      //Update the display if 1 second passed since the first frame.
      const currentTimeMillisecond = this.time.getCurrentTimeMillisecond();
      if (currentTimeMillisecond - this.firstFrameTimeMillisecond > 1000 /*1 second*/) {
                
        //Update the display
        // -1 because the last frame finished after 1 second.
        this.debugDiv.textContent = "Frame per second = " + (this.counter - 1);
        //Reset frame counter
        this.frameCounterTimerMillisecond = this.frameCounterTimerMillisecond - 1000;

        this.firstFrameTimeMillisecond = this.lastFrameTimeMillisecond;
        this.counter = 0;    
      }

      this.lastFrameTimeMillisecond = this.currentTimeMillisecond;
    }
  }
};
