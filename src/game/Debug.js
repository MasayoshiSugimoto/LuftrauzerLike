/********************************************************************************
 * Manages debug menu.
 *
 * Press [`] to toggle debug mode.
 *******************************************************************************/

const DEBUG_MENU_FPS_ID = 'debug-menu-fps'
const DEBUG_MENU_NB_ENTITIES = 'debug-menu-nb-entities'
const DEBUG_MENU_HP = 'debug-menu-hp'
const DEBUG_MENU_ROOT_ID = 'debug-menu'
const DEBUG_MENU_CB_ENNEMY_GENERATOR_ENABLED = 'cb-ennemy-generator-enabled'


export let DEBUG_ENABLED = false


export const debugData = {
  ennemyGeneratorEnabled: true
}


export function setupDebug() {
	// Setup keyboard handlers.
  window.addEventListener('keydown', event => {
		switch (event.key) {
			case '`':
				DEBUG_ENABLED = !DEBUG_ENABLED
        setDebugMenuVisibility()
				break
		}
  })
}


export function updateDebug(entityManager, elapsedTimeSecond) {
  fpsElement().innerText = 1 / elapsedTimeSecond 
  nbEntitiesElement().innerText = entityManager.getActiveCount()
  updateEnnemyGeneratorEnabled(debugData)
}


function setDebugMenuVisibility() {
  const debugMenu = document.getElementById(DEBUG_MENU_ROOT_ID)
  debugMenu.style.display = DEBUG_ENABLED ? 'block' : 'none'
}


/*******************************************************************************
 * Private functions
 ******************************************************************************/


function fpsElement() {
  return document.getElementById(DEBUG_MENU_FPS_ID)
}


function nbEntitiesElement() {
  return document.getElementById(DEBUG_MENU_NB_ENTITIES)
}


function hpElement() {
  return document.getElementById(DEBUG_MENU_HP)
}


function updateEnnemyGeneratorEnabled(debugData) {
  const input = document.getElementById(DEBUG_MENU_CB_ENNEMY_GENERATOR_ENABLED)
  debugData.ennemyGeneratorEnabled = input.checked
}

setupDebug()
