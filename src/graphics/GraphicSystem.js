"use strict"

GraphicSystem.CANVAS_ID = 'canvas'

function GraphicSystem(maxEntity, physicsSystem) {
  this.canvas = Canvas.create(
    document.getElementById(GraphicSystem.CANVAS_ID),
    window
  )
  this.canvas.fullScreen()
  this.actives = []
  this.components = []
  for (let i = 0; i < maxEntity; i++) {
    this.actives.push(false)
    const component = {}
    GraphicSystem.initComponent(component)
    this.components.push(component)
  }
  this.physicsSystem = physicsSystem
}

GraphicSystem.prototype.createComponent = function(entityId) {
  GraphicSystem.initComponent(this.components[entityId])
  this.actives[entityId] = true
}

GraphicSystem.prototype.deleteComponent = function(entityId) {
  this.actives[entityId] = false
}

GraphicSystem.prototype.update = function(elapsedTimeSecond) {
  this.canvas.clear()
  const canvas = this.canvas.getContext()
  canvas.save()
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return
    // Update screen coordinates based on position in game space.
    if (this.physicsSystem.isActive(entityId)) {
      component.position = this.physicsSystem
        .getPosition(entityId)
        .scalarMultiply(PIXEL_PER_METER)
    }

    canvas.translate(component.position.getX(), component.position.getY())
    canvas.rotate(component.direction)
    canvas.globalAlpha = component.opacity
    canvas.drawImage(
      component.image,
      -component.size.x / 2,
      -component.size.y / 2,
      component.size.x,
      component.size.y
    )
  })
  canvas.restore()
}

GraphicSystem.prototype.setupImage = function(entityId, image) {
  const component = this.components[entityId]
  GraphicSystem.initComponent(component)
  component.image = image
  component.size = Vector2D.create(
    image.width * component.scale,
    image.height * component.scale
  )
}

GraphicSystem.prototype.setScale = function(entityId, scale) {
  const component = this.component[entityId]
  component.size = Vector2D.create(
    image.width * component.scale,
    image.height * component.scale
  )
}

GraphicSystem.prototype.setPosition = function(entityId, position) {
  const component = this.components[entityId]
  component.position = position
}

GraphicSystem.initComponent = function(component) {
  component.position = Vector2D.zero() // Screen coordinates
  component.direction = 0
  component.scale =  1.0
  component.opacity = 1.0
  component.image = undefined
  component.size = 0.0
}

GraphicSystem.toScreenPosition = function(gameSpacePosition) {
  return gameSpacePosition.scalarMultiply(PIXEL_PER_METER) 
}
