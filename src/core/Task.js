"use strict";

const Task = () => {
  const task = {
    asynchronous: false,
    then(onEndCallback) {
      this.onEndCallback = onEndCallback;
      this.nextTask = Task(onEndCallback);
      this.nextTask.head = this.head;
      return this.nextTask;
    },
    execute() {
      this.onEndCallback(this);
      //If the callback as not been requested, consider this task as synchronous.
      if (!this.asynchronous) {
        this.nextTask.execute();
      }
      return this;
    },
    launch() {
      this.head.execute();
      return this;
    },
    getCallback() {
      this.asynchronous = true; //Consider this task asynchronous if it require the callback
      const that = this;
      return () => { that.nextTask.execute; }
    },
  };
  task.head = task;
  return task;
};
