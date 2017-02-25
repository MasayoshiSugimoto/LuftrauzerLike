"use strict";

const MathUtil = { };

MathUtil.clamp = (minValue, value, maxValue) => {
  return Math.min(maxValue, Math.max(value, minValue));
};
