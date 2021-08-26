"use strict"

/********************************************************************************
 * DiscEntity
 *******************************************************************************/

const DISC_ENTITY_ENTITY_MAX = 1000

function DiskEntity(entityManager) {
  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])
  const componentFactory = new ComponentFactory(this.entityId, entityManager)
  componentFactory.createDiscComponent()
}

function CreateDiscEntities(entityManager) {
	for (let i = 0; i < DISC_ENTITY_ENTITY_MAX; i++) {
    new DiskEntity(entityManager)
	}
}
