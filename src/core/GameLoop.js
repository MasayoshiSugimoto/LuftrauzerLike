"use strict";

const GAME_LOOP_FRAME_TIME_MILLISECOND    = 1000.0 / 60.0;
const GAME_LOOP_MARGIN_MILLISECOND        = 1;
const GAME_LOOP_MAX_INTERVAL_MILLISECOND  = 1000 / 30; //Maximum duration for a frame.

const GameLoop = {
  create(windowObject, time) {
    const result = Object.assign( {
        windowObject: windowObject,
        time: time,
        gameLoop: () => { },
        lastTimeMillisecond: time.getCurrentTimeMillisecond(),
      },
      this.proto
    );
    result.nextLoop();
    return result;
  },

  proto: {

    setGameLoop(gameLoop) {
      this.gameLoop = gameLoop;
      return this;
    },

    nextLoop() {

      //First thing to do on a frame update is to update the current time.
      //Calculate the elapsed time
      const frameStartTimeMillisecond = this.time.getCurrentTimeMillisecond();
      const elapsedTimeMillisecond = Math.min(
          (frameStartTimeMillisecond - this.lastTimeMillisecond),
          GAME_LOOP_MAX_INTERVAL_MILLISECOND); //Interval in seconds
      this.lastTimeMillisecond = frameStartTimeMillisecond;

      this.gameLoop(elapsedTimeMillisecond / 1000.0);

      const that = this;
      this.windowObject.setTimeout( () => { that.nextLoop(); },
          GAME_LOOP_FRAME_TIME_MILLISECOND
              - (this.time.getCurrentTimeMillisecond() - frameStartTimeMillisecond) 
              - GAME_LOOP_MARGIN_MILLISECOND);
      return this;
    },

  },

};
