"use strict"

/********************************************************************************
* LifeComponent manages HP and death.
********************************************************************************/

const LIFE_COMPONENT_DYING_TIME_SECOND = 1
const LIFE_COMPONENT_COOLDOWN_SECOND = 0.5

function LifeComponent(maxHP, entityManager) {
	this.maxHP = maxHP
	this.hp = maxHP
	this.entityManager = entityManager
	this.dyingTimer = LIFE_COMPONENT_DYING_TIME_SECOND
  this.deathSubscription = entityManager.getDeathSubscription()
  this.cooldown = 0
}

LifeComponent.prototype.update = function(entityId, elapsedTimeSecond) {
	if (this.hp > 0) {
    this.cooldown = Math.max(0, this.cooldown - elapsedTimeSecond)
  } else {
    this.dyingTimer = Math.max(0, this.dyingTimer - elapsedTimeSecond)
    if (this.dyingTimer <= 0) {
      this.deathSubscription.publish({ entityId })
      this.entityManager.deleteEntity(entityId)
    }
  }
}

LifeComponent.prototype.isDead = function() {
	return this.hp <= 0
}

LifeComponent.prototype.takeDamage = function(damage) {
  if (this.cooldown > 0) return
	this.hp = Math.max(0, this.hp - damage)
  this.cooldown = LIFE_COMPONENT_COOLDOWN_SECOND
}

LifeComponent.prototype.isDying = function() {
	return this.isDead() && this.dyingTimer > 0
}

LifeComponent.prototype.getHP = function() {
	return this.hp
}

LifeComponent.prototype.getMaxHP = function() {
	return this.maxHP
}

/********************************************************************************
* Poor man's test.
********************************************************************************/

LifeComponent.test = function() {
  function check(lifeComponent) {
    console.log(JSON.stringify(lifeComponent))
  }

  const entityManager = {
    getDeathSubscription() {
      return {
        publish(entityId) {
          console.log(`DeathSubscription.push(${JSON.stringify(entityId)})`)
        }
      }
    },
    deleteEntity(entityId) {
      console.log(`deleteEntity(${entityId})`)
    }
  }

  const lifeComponent = new LifeComponent(10, entityManager)
  check(lifeComponent)

  lifeComponent.update(0, 0.1)
  check(lifeComponent)

  lifeComponent.takeDamage(1)
  check(lifeComponent)

  lifeComponent.update(0, 0.1)
  check(lifeComponent)

  lifeComponent.takeDamage(1)
  check(lifeComponent)

  lifeComponent.update(0, 0.5)
  check(lifeComponent)

  lifeComponent.takeDamage(9)
  check(lifeComponent)

  lifeComponent.update(0, 0.1)
  check(lifeComponent)

  lifeComponent.update(0, 1.0)
  check(lifeComponent)
}

