"use strict"

/*******************************************************************************
 * Rectangle entities for debug.
 ******************************************************************************/

function RectangleEntity(entityManager, playerEntityId, width, height) {
  this.entityId = entityManager.createEntity([
    EntityManager.SYSTEM_TYPES.GAME,
    EntityManager.SYSTEM_TYPES.PHYSICS,
    EntityManager.SYSTEM_TYPES.GRAPHICS
  ])
  const componentFactory = new ComponentFactory(this.entityId, entityManager)
  componentFactory.createRectangleComponent(playerEntityId, width, height)
}

