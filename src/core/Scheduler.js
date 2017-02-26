"use strict";

const SCHEDULER_FRAME_TIME_MILLISECOND    = 1000.0 / 60.0;
const SCHEDULER_MAX_INTERVAL_MILLISECOND  = 1000 / 30; //Maximum duration for a frame.
const SCHEDULER_MARGIN_MILLISECOND        = 1;

const Scheduler = {

  create(time) {
    return Object.assign(
      {
        time: time,
        lastTimeMillisecond: time.getCurrentTimeMillisecond(),
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

          gameLoopFunction(elapsedTimeMillisecond / 1000.0);

          let scheduler = this;
          this.callbackHandle = window.setTimeout(
            () => { scheduler.callByInterval(gameLoopFunction, intervalMilliseconds); },
            //Remaining time before frame update in millisecond
            intervalMilliseconds
                - (time.getCurrentTimeMillisecond() - frameStartTimeMillisecond) 
                - SCHEDULER_MARGIN_MILLISECOND
          );
          return this;
        },

        cancel() {
          if (null != this.callbackHandle) {
            clearTimeout(this.callbackHandle);
          }
          return this;
        },

        setGameLoop(gameLoop) {
          this.cancel().callByInterval(gameLoop, SCHEDULER_FRAME_TIME_MILLISECOND);
        }
      }
    );
  },

};

