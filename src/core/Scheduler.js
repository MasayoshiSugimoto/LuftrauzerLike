"use strict";

const SCHEDULER_MAX_INTERVAL_MILLISECOND = 1000 / 30; //Maximum duration for a frame.
const SCHEDULER_MARGIN_MILLISECOND = 1;

const Scheduler = {

  create(time) {
    return Object.assign(
      {
        time: time,
        lastTimeMillisecond: time.getCurrentTimeMillisecond(),
        frameCounter: 0,
        frameCounterTimerMillisecond: 0
      },
      {
        callByInterval(gameLoopFunction, intervalMilliseconds) {
          //First thing to do on a frame update is to update the current time.
          //Calculate the elapsed time
          const frameStartTimeMillisecond = time.getCurrentTimeMillisecond();
          const elapsedTimeMillisecond = Math.min(
              (frameStartTimeMillisecond - this.lastTimeMillisecond),
              SCHEDULER_MAX_INTERVAL_MILLISECOND); //Interval in seconds
          this.lastTimeMillisecond = frameStartTimeMillisecond;

          //Update frame counter
          this.frameCounter++;
          this.frameCounterTimerMillisecond = this.frameCounterTimerMillisecond + elapsedTimeMillisecond;

          if (this.frameCounterTimerMillisecond >= 1000 /* 1 second */) {
            //Update frame counter display
            let debugDiv = document.getElementById("debug");
            if (null != debugDiv) {
              debugDiv.textContent = "Frame per second = " + this.frameCounter;
              //Reset frame counter
              this.frameCounterTimerMillisecond = this.frameCounterTimerMillisecond - 1000;
            }
            this.frameCounter = 0;
          }

          gameLoopFunction(elapsedTimeMillisecond / 1000.0);

          let scheduler = this;
          this.callbackHandle = window.setTimeout(
            () => { scheduler.callByInterval(gameLoopFunction, intervalMilliseconds); },
            //Remaining time before frame update in millisecond
            intervalMilliseconds
                - (time.getCurrentTimeMillisecond() - frameStartTimeMillisecond) 
                - SCHEDULER_MARGIN_MILLISECOND
          );
        },

        cancel() {
          clearTimeout(this.callbackHandle);
        },

      }
    );
  },

};

