"use strict";

const RectangleComposite = (state) => ({

  getSize() {
    return this.size;
  },

  setSize(size) {
    this.size = size;
    return this;
  },

  getGeometryType() {
    return "Rectangle";
  }

})
