"use strict";

/*******************************************************************************
 * Angle keeps an angle between -Pi and Pi.
 ******************************************************************************/

Angle.PI = 3.14159265359
Angle.PI2 = 2 * Angle.PI

function Angle() {}

Angle.normalize = function(angle) {
  let circleRatio = Math.floor(angle / Angle.PI2)
  angle = angle - (circleRatio * Angle.PI2)
  if (-Math.PI <= angle && angle <= Math.PI) {
		return angle
  } else if (angle > Math.PI) {
    return -Angle.PI2 + angle
  } else {
		return Angle.PI2 + angle
	}
}

Angle.normalize2PI = function(angle) {
  let circleRatio = Math.floor(angle / Angle.PI2)
  const sign = angle >= 0 ? 1 : -1
  return angle - (circleRatio * Angle.PI2)
}
