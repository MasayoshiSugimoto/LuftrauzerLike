"use strict";

const PIXEL_PER_METER = 200;

const ScreenConversion = {

  meter2Pixel(distanceInMeter) {
    return distanceInMeter * PIXEL_PER_METER;
  },

  pixel2Meter(distanceInPixel) {
    return distanceInPixel / PIXEL_PER_METER;
  },

  vectorMeter2Pixel(v) {
    return v.scalarMultiply(PIXEL_PER_METER);
  },

  vectorPixel2Meter(v) {
    return v.scalarMultiply(1 / PIXEL_PER_METER);
  }

};
