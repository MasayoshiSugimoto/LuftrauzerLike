"use strict"

/********************************************************************************
* CollisionSystem.
********************************************************************************/

/*
 * - We want the update to happen after the physics engine update.
 * - The Collision system will be coupled with the HP component of the game system.
 * - We need some flag somewhere to enable collision for an entity -> Collision component
 * - Collision component will be managed by the game system.
 * - CollisionSystem seems to be a better place to put the 2d hash map.
 *   -> It will be better in the physics system in fact. Everything which has a position
 *   should be managed by the 2D hash map.
 * - Collision system needs to be notified when a collision component is created
 *   to manage the 2d hash map. -> CollisionSystem declares factory to create collision
 *   components.
 * - Collision system will have a dependency on the physics system.
 */

function CollisionSystem(entityManager) {
  this.entityManager = entityManager
}

CollisionSystem.prototype.update = function(elapsedTimeSecond) {
  	
}

