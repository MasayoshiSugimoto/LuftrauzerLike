"use strict"

/*******************************************************************************
 * Rectangle entities for debug.
 ******************************************************************************/

function RectangleEntity(entityManager, playerEntityId, width, height) {
  this.entityId = entityManager.createEntity()
  const componentFactory = new ComponentFactory(this.entityId, entityManager)
  componentFactory.createRectangleComponent(playerEntityId, width, height)
}

