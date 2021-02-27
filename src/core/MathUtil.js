"use strict";

function MathUtil() {}

MathUtil.EPSILON = 0.00001;

MathUtil.clamp = (minValue, value, maxValue) => {
  return Math.min(maxValue, Math.max(value, minValue));
};
