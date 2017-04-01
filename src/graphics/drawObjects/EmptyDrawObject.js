"use strict";

//This empty draw object does nothing.
const EmptyDrawObject = {
  className: "EmptyDrawObject",
  update(elapsedTimeSecond) { return this; },
  draw() { /* Do nothing */ },
  toDelete() { }
}
