"use strict"

/********************************************************************************
 * Manages debug menu.
 *******************************************************************************/

const DEBUG_MENU_FPS_ID = 'debug-menu-fps'
const DEBUG_MENU_NB_ENTITIES = 'debug-menu-nb-entities'

let DEBUG_ENABLED = true

function Debug(entityManager) {
  window.addEventListener('keydown', event => {
    if (event.key === '`') DEBUG_ENABLED = !DEBUG_ENABLED
  })

  this.entityManager = entityManager

  this.fpsElement = document.getElementById(DEBUG_MENU_FPS_ID)
  this.nbEntitiesElement = document.getElementById(DEBUG_MENU_NB_ENTITIES)
}

Debug.prototype.update = function(elapsedTimeSecond) {
  this.fpsElement.innerText = 1 / elapsedTimeSecond 
  this.nbEntitiesElement.innerText = this.entityManager.getActiveCount()
}
