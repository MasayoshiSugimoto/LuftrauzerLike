"use strict"

/********************************************************************************
 * DiscEntity
 *******************************************************************************/

const DISC_ENTITY_ENTITY_MAX = 1000

function DiskEntity(entityManager) {
  this.entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(this.entityId, entityManager)
  componentFactory.createDiscComponent()
}

function CreateDiscEntities(entityManager) {
	for (let i = 0; i < DISC_ENTITY_ENTITY_MAX; i++) {
    new DiskEntity(entityManager)
	}
}
