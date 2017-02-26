"use strict";

const SharedInitializer = (images) => {
  return {

    getScheduler() {
      if (null == this.scheduler) {
        this.scheduler = Scheduler.create(Time.create());
      }
      return this.scheduler;
    },

  };
};
