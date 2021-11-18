/********************************************************************************
 * Math utils
 *******************************************************************************/


export function clamp(downBound, value, upBound) {
  return Math.max(downBound, Math.min(value, upBound))
}
