"use strict";

function Disposable(object) {
  object.toBeDeleted = false;
  return {
    markForDeletion() {
      this.toBeDeleted = true;
      return this;
    },
    toDelete() {
      return this.toBeDeleted;
    }
  }
};
