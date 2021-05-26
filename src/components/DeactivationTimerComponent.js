"use strict"

/********************************************************************************
 * Deactivate an entity after the set amount of time.
 *******************************************************************************/

// `timeSecond` is the time before the entity is deactivated.
function DeactivationTimerComponent(timeSecond, entityManager) {
  this.timeSecond = timeSecond
  this.entityManager = entityManager
}

DeactivationTimerComponent.prototype.update = function(entityId, elapsedTimeSecond) {
  this.timeSecond -= elapsedTimeSecond
  if (this.timeSecond <= 0) {
    this.entityManager.deleteEntity(entityId)
  }
}
