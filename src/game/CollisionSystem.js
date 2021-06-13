"use strict"

/********************************************************************************
* CollisionSystem.
********************************************************************************/

/*
 * - Abandon collision system and just implement a function in the physic system
 * - We need to propagate events to the game system when collision occurs.
 */

function CollisionSystem(entityManager) {
  this.entityManager = entityManager
}

CollisionSystem.prototype.update = function(elapsedTimeSecond) {
  	
}

