"use strict"

/********************************************************************************
 * GraphicSystem manages all rendering.
 *******************************************************************************/

GraphicSystem.SKY_COLOR = '#66ccff'
GraphicSystem.MAX_BASE = 100
GraphicSystem.BASE_COLOR = '#FF0000'

function GraphicSystem(maxEntity, physicsSystem, canvas) {
  this.canvas = canvas
  this.actives = []
  this.components = []
  for (let i = 0; i < maxEntity; i++) {
    this.actives.push(false)
    const component = {}
    GraphicSystem.initComponent(component)
    this.components.push(component)
  }
  this.physicsSystem = physicsSystem
	this.targetEntityId = -1
}

GraphicSystem.prototype.createComponent = function(entityId) {
  GraphicSystem.initComponent(this.components[entityId])
  this.actives[entityId] = true
}

GraphicSystem.prototype.deleteComponent = function(entityId) {
  this.actives[entityId] = false
}

GraphicSystem.prototype.update = function(elapsedTimeSecond) {
	this.canvas.setBackgroundColor(GraphicSystem.SKY_COLOR)
  const canvas = this.canvas.getContext()
	canvas.save()
	this.centerOn(this.canvas, this.targetEntityId)
  this.components.forEach((component, entityId) => {
    if (!this.actives[entityId]) return

    // Update screen coordinates based on position in game space.
    if (this.physicsSystem.isActive(entityId)) {
      const physicsComponent = this.physicsSystem.getComponent(entityId)
      const position = physicsComponent.position
      component.position = new Vector2D(position.x, -position.y)
        .scalarMultiply(PIXEL_PER_METER)
      component.direction = physicsComponent.direction
    }

    canvas.save()
    canvas.translate(component.position.x, component.position.y)
    canvas.rotate(component.direction)
    canvas.globalAlpha = component.opacity
    canvas.drawImage(
      component.image,
      -component.size.x / 2,
      -component.size.y / 2,
      component.size.x,
      component.size.y
    )
    canvas.restore()
  })
	this.drawBase()
	canvas.restore()
}

GraphicSystem.prototype.setupImage = function(entityId, image) {
  const component = this.components[entityId]
  GraphicSystem.initComponent(component)
  component.image = image
  this.setScale(entityId, component.scale)
}

GraphicSystem.prototype.setScale = function(entityId, scale) {
  const component = this.components[entityId]
  component.size = Vector2D.create(
    component.image.width * scale,
    component.image.height * scale
  )
}

GraphicSystem.prototype.setPosition = function(entityId, position) {
  const component = this.components[entityId]
  component.position = position
}

GraphicSystem.prototype.getPosition = function(entityId) {
	return this.components[entityId]
}

GraphicSystem.prototype.centerOn = function(canvas, entityId) {
	const canvasContext = canvas.getContext()
	if (entityId < 0 || entityId >= this.components.length) return
	const position = this.components[entityId].position
	canvasContext.translate(canvas.getWidth() / 2 - position.x, canvas.getHeight() / 2 - position.y)	
}

GraphicSystem.prototype.setOpacity = function(entityId, opacity) {
	this.components[entityId].opacity = opacity
}

GraphicSystem.prototype.setTargetEntityId = function(targetEntityId) {
	this.targetEntityId = targetEntityId
}

GraphicSystem.prototype.drawBase = function() {
	const context = this.canvas.getContext()
	context.save()
	context.strokeStyle = GraphicSystem.BASE_COLOR
	context.beginPath()
	context.moveTo(-GraphicSystem.MAX_BASE * PIXEL_PER_METER, 0)
	context.lineTo(GraphicSystem.MAX_BASE * PIXEL_PER_METER, 0)
	context.moveTo(0, GraphicSystem.MAX_BASE * PIXEL_PER_METER)
	context.lineTo(0, -GraphicSystem.MAX_BASE * PIXEL_PER_METER)
	context.stroke()
	for (let i = -GraphicSystem.MAX_BASE; i <= GraphicSystem.MAX_BASE; i++) {
		context.beginPath()
		context.moveTo(i * PIXEL_PER_METER, -5)
		context.lineTo(i * PIXEL_PER_METER, 5)
		context.stroke()
		context.beginPath()
		context.moveTo(-5, i * PIXEL_PER_METER)
		context.lineTo(5, i * PIXEL_PER_METER)
		context.stroke()
	}
	context.restore()
}

/********************************************************************************
 * Static Functions
 *******************************************************************************/

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
