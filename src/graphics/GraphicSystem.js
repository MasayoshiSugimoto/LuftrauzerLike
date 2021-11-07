"use strict"

/********************************************************************************
 * GraphicSystem manages all rendering.
 *******************************************************************************/

GraphicSystem.SKY_COLOR = '#66ccff'
GraphicSystem.MAX_BASE = 100
GraphicSystem.BASE_COLOR = '#FF0000'
GraphicSystem.DEFAULT_SIZE = new Vector2D(10, 10)
GraphicSystem.DEFAULT_COLOR = 'red'

GraphicSystem.DRAW_TYPE_IMAGE = 0
GraphicSystem.DRAW_TYPE_DISK = 1
GraphicSystem.DRAW_TYPE_RECTANGLE = 2

function GraphicSystem(maxEntity, physicsSystem, canvas, gameSystem) {
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
	this.gameSystem = gameSystem
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

      component.size = physicsComponent.size.scalarMultiply(PIXEL_PER_METER)
    }

    canvas.save()
    canvas.translate(component.position.x, component.position.y)
    canvas.rotate(component.direction)
    canvas.globalAlpha = component.opacity
		switch (component.drawType) {
			case GraphicSystem.DRAW_TYPE_IMAGE:
				this.drawImage(canvas, component)
				break
			case GraphicSystem.DRAW_TYPE_DISK:
				this.drawDisk(canvas, component)
				break
			case GraphicSystem.DRAW_TYPE_RECTANGLE:
				this.drawRectangle(canvas, component)
				break
		}
    canvas.restore()
  })
  // if (DEBUG_ENABLED) this.drawBase()
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

GraphicSystem.prototype.setDisk = function(entityId) {
	const component = this.components[entityId]
	if (!component) return
	component.drawType = GraphicSystem.DRAW_TYPE_DISK
}

GraphicSystem.prototype.setRectangle = function(entityId, width, height) {
	const component = this.components[entityId]
	if (!component) return
	component.drawType = GraphicSystem.DRAW_TYPE_RECTANGLE
	component.size = new Vector2D(width, height)
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

GraphicSystem.prototype.drawImage = function(context, component) {
	context.drawImage(
		component.image,
		-component.size.x / 2,
		-component.size.y / 2,
		component.size.x,
		component.size.y
	)
}

GraphicSystem.prototype.drawDisk = function(context, component) {
	context.beginPath()
	context.fillStyle = component.color
	context.arc(0, 0, component.size.x, 0, Math.PI*2)
	context.fill()
}

GraphicSystem.prototype.drawRectangle = function(context, component) {
	context.strokeStyle = component.color
	context.beginPath()
	const x = component.position.x
	const y = component.position.y
	const width = component.size.x
	const height = component.size.y
	context.rect(
		- width / 2,
		- height / 2,
		width,
		height
	)
	context.stroke()
}

GraphicSystem.prototype.setColor = function(entityId, color) {
	const component = this.components[entityId]
	if (!component) return
	component.color = color
}

GraphicSystem.prototype.getImage = function(entityId) {
  return this.components[entityId]?.image
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
  component.size = GraphicSystem.DEFAULT_SIZE
	component.drawType = GraphicSystem.DRAW_TYPE_IMAGE
	component.color = GraphicSystem.DEFAULT_COLOR
}

GraphicSystem.toScreenPosition = function(gameSpacePosition) {
  return gameSpacePosition.scalarMultiply(PIXEL_PER_METER) 
}
