"use strict";

/*******************************************************************************
 * MobilitySystem manage mobility of entities.
 ******************************************************************************/

function MobilitySystem(maxEntities) {
  this.components = []
	for (let i = 0; i < maxEntities; i++) {
    const component = {}
    MobilitySystem.initComponent(component)
		this.components.push(component)
	}
}

MobilitySystem.prototype.initComponent = function(component) {
  component.active = false
}

MobilitySystem.prototype.update = function(elapsedTimeSecond) {
  for (let i = 0; i < this.components.length; i++) {
    const component = this.components[i]
    if (!component.active) continue
  }
}
