"use strict";

const Singleton = (factory) => {
  return {
    factory  : factory,
    instance : null,

    getInstance() {
      if (this.instance == null) {
        this.instance = this.factory();
      }
      return this.instance;
    }
  };

}
