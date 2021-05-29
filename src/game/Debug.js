"use strict"

/********************************************************************************
 * Manages debug menu.
 *******************************************************************************/

const DEBUG_MENU_FPS_ID = 'debug-menu-fps'
const DEBUG_MENU_NB_ENTITIES = 'debug-menu-nb-entities'
const DEBUG_MENU_HP = 'debug-menu-hp'

let DEBUG_ENABLED = true

function Debug(entityManager, playerEntityId) {
	// Setup keyboard handlers.
  window.addEventListener('keydown', event => {
		switch (event.key) {
			case '`':
				DEBUG_ENABLED = !DEBUG_ENABLED
				break
		}
  })

  this.entityManager = entityManager
	this.playerEntityId = playerEntityId

	// Get all ui elements.
  this.fpsElement = document.getElementById(DEBUG_MENU_FPS_ID)
  this.nbEntitiesElement = document.getElementById(DEBUG_MENU_NB_ENTITIES)
	this.hpElement = document.getElementById(DEBUG_MENU_HP)
}

Debug.prototype.update = function(elapsedTimeSecond) {
  this.fpsElement.innerText = 1 / elapsedTimeSecond 
  this.nbEntitiesElement.innerText = this.entityManager.getActiveCount()
	this.hpElement.innerText = this.entityManager.getGameSystem()
		.getComponent(this.playerEntityId, GAME_COMPONENT_ID_LIFE)
		?.getHP()
}
