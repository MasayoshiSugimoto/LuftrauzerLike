"use strict";

const Util = {
  create() {
    return Object.create(this.proto);
  },

  proto: {
    assert(condition,message) {
      if (!condition) {
        throw message || "Assertion failure.";
      }
    },

    assertEqualFloat(expected, actual) {
      this.assert(this.compareFloat(expected, actual));
    },

    compareFloat(float1,float2) {
      return -EPSILON < (float1 - float2) && (float1 - float2) < EPSILON;
    },

    defined(object) {
      return typeof object !== 'undefined';
    }
  }

}
