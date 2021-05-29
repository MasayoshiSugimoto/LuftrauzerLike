"use strict"

/********************************************************************************
* LifeComponent manages HP and death.
********************************************************************************/

const LIFE_COMPONENT_DYING_TIME_MILLISECOND = 1000

function LifeComponent(maxHP, entityManager) {
	this.hp = maxHP
	this.entityManager = entityManager
	this.dyingTimer = LIFE_COMPONENT_DYING_TIME_MILLISECOND
}

LifeComponent.prototype.update = function(entityId, elapsedTimeSecond) {
	if (this.hp > 0) return

	this.dyingTimer -= elapsedTimeSecond
	if (this.dyingTimer <= 0) {
		this.entityManager.deleteEntity(entityId)
	}
}

LifeComponent.prototype.isDead = function() {
	return this.hp <= 0
}

LifeComponent.prototype.addDamage = function(damage) {
	this.hp = Math.max(0, this.hp - damage)
}

LifeComponent.prototype.isDying = function() {
	return this.isDead() && this.dyingTimer > 0
}

LifeComponent.prototype.getHP = function() {
	return this.hp
}

/*
// TODO
AnimationComponent: {
	update(entityId, elapsedTimeSecond),
}
LifeComponent: {
	update(entityId, elapsedTimeSecond),
	isDying(),
	isDead(),
	addDamage(),
}
*/
