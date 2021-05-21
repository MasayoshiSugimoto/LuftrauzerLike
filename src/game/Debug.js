"use strict"

/********************************************************************************
 * Manages debug menu.
 *******************************************************************************/

const DEBUG_MENU_FPS_ID = 'debug-menu-fps'

let DEBUG_ENABLED = true

function Debug() {
  window.addEventListener('keydown', event => {
    if (event.key === '`') DEBUG_ENABLED = !DEBUG_ENABLED
  })

  this.fpsElement = document.getElementById(DEBUG_MENU_FPS_ID)
}

Debug.prototype.update = function(elapsedTimeSecond) {
  this.fpsElement.innerText = 1 / elapsedTimeSecond 
}
