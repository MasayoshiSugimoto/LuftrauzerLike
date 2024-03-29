/********************************************************************************
 * GraphicSystem manages all rendering.
 *******************************************************************************/


import {Vector2D} from '../geometry/Vector2D.js'


GraphicSystem.SKY_COLOR = '#66ccff'
GraphicSystem.MAX_BASE = 100
GraphicSystem.BASE_COLOR = '#FF0000'
GraphicSystem.DEFAULT_SIZE = new Vector2D(10, 10)
GraphicSystem.DEFAULT_COLOR = 'red'


export function GraphicSystem(maxEntity, physicsSystem, camera, gameSystem) {
  this.camera = camera
  this.canvas = camera.canvas
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
	this.centerOn(this.canvas, this.camera.entityId)
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
    component.drawFunctions.forEach(f => f(canvas, component))
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
  component.drawFunctions = [GraphicSystem.drawDisk]
}

GraphicSystem.prototype.setRectangle = function(entityId, width, height) {
	const component = this.components[entityId]
	if (!component) return
  component.drawFunctions = [GraphicSystem.drawRectangle]
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
	component.color = GraphicSystem.DEFAULT_COLOR
  component.drawFunctions = [GraphicSystem.drawImage]
}

GraphicSystem.toScreenPosition = function(gameSpacePosition) {
  return gameSpacePosition.scalarMultiply(PIXEL_PER_METER) 
}

GraphicSystem.drawImage = function(context, component) {
  context.save()
  context.rotate(component.direction)
  context.globalAlpha = component.opacity
	context.drawImage(
		component.image,
		-component.size.x / 2,
		-component.size.y / 2,
		component.size.x,
		component.size.y
	)
  context.restore()
}


GraphicSystem.drawDisk = function(context, component) {
  context.save()
  context.rotate(component.direction)
  context.globalAlpha = component.opacity
	context.beginPath()
	context.fillStyle = component.color
	context.arc(0, 0, component.size.x, 0, Math.PI*2)
	context.fill()
  context.restore()
}

GraphicSystem.drawRectangle = function(context, component) {
  context.save()
	context.fillStyle = component.color
  context.rotate(component.direction)
	const x = component.position.x
	const y = component.position.y
	const width = component.size.x
	const height = component.size.y
	context.fillRect(
		- width / 2,
		- height / 2,
		width,
		height
	)
  context.restore()
}

GraphicSystem.screenToGameSpace = function(screenPosition) {
  return new Vector2D(screenPosition.x, -screenPosition.y).scalarMultiply(1/PIXEL_PER_METER)
}
