"use strict";

const SharedInitializer = (images) => {
  return {

    getScheduler() {
      if (null == this.scheduler) {
        this.scheduler = Scheduler.create(Time.create());
      }
      return this.scheduler;
    },

    getDebugMenu() {
      if (null == this.debugMenu) {
        this.debugMenu = DebugMenu.create(document);
      }
      return this.debugMenu;
    },

    getFrameCounter() {
      if (null == this.frameCounter) {
        this.frameCounter = FrameCounter.create(Time.create(), this.getDebugMenu());
      }
      return this.frameCounter;
    },

    getGameLoop() {
      if (null == this.gameLoop) {
        this.gameLoop = GameLoop.create(window, Time.create());
      }
      return this.gameLoop;
    },

  };
};
