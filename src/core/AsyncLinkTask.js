"use strict";

const EmptyAsyncLinkTask = {
  callback() { }
};

const AsyncLinkTask = {
  create(callback) {
    const task = Object.assign( {
      head: null,
      callback: callback,
      next: EmptyAsyncLinkTask,
    }, this.proto);
    task.head = task;
    return task;
  },
  proto: {
    execute() {
      const that = this;
      this.callback( () => { that.next.execute(); } );
    },
    then(callback) {
      this.next = AsyncLinkTask.create(callback);
      this.next.head = this.head;
      return this.next;
    },
    launch() {
      this.head.execute();
    }
  },
};
