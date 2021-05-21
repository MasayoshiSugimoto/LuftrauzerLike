"use strict"

/********************************************************************************
 * Manages debug menu.
 *******************************************************************************/

let DEBUG_ENABLED = true

function Debug() {}

window.addEventListener('keydown', event => {
  if (event.key === '`') DEBUG_ENABLED = !DEBUG_ENABLED
})
