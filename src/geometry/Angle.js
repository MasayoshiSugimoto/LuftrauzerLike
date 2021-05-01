"use strict";

/*******************************************************************************
 * Angle keeps an angle between -Pi and Pi.
 ******************************************************************************/

Angle.PI = 3.14159265359
Angle.PI2 = 2 * Angle.PI

function Angle() {}

Angle.normalize = function(angle) {
  let circleRatio = Math.floor(angle / Angle.PI2)
  const sign = angle >= 0 ? 1 : -1
  angle = angle - (circleRatio * Angle.PI2)
  angle = Math.abs(angle)
  if (angle > Angle.PI) {
    return -sign * (Angle.PI2 - angle)
  } else {
    return sign * angle
  }
}

Angle.normalize2PI = function(angle) {
  let circleRatio = Math.floor(angle / Angle.PI2)
  const sign = angle >= 0 ? 1 : -1
  return angle - (circleRatio * Angle.PI2)
}

/*
for (let i = -4; i <= 4; i+=0.25) {
  const angle = i*Angle.PI
  console.log(`${i} => ${angle} => ${Angle.normalize2PI(angle)}`)
}
*/
