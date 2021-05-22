"use strict";

const VECTOR_2D_EPSILON = 0.00001;

Vector2D.ZERO = new Vector2D(0, 0)
Vector2D.X_ONE = new Vector2D(1, 0)
Vector2D.Y_ONE = new Vector2D(0, 1)

function Vector2D(x, y) {
  this.x = x;
  this.y = y;
}

Vector2D.create = function(x, y) {
  return new Vector2D(x,y)
}

Vector2D.fromData = function(vector2DData) {
  return this.create(vector2DData.x, vector2DData.y);
}

Vector2D.zero = function() {
  return Vector2D.ZERO
}

Vector2D.unitX = function() {
  return Vector2D.X_ONE
}

Vector2D.unitY = function() {
  return Vector2D.Y_ONE
}


Vector2D.distanceBetween = function(v1, v2) {
  return v1.substract(v2).distance();
}

Vector2D.prototype.getX = function() {
  return this.x;
}

Vector2D.prototype.getY = function() {
  return this.y;
}

Vector2D.prototype.add = function(vector2D) {
  return new Vector2D(vector2D.x + this.x, vector2D.y + this.y)
}

Vector2D.prototype.substract = function(vector2D) {
  return new Vector2D(this.x - vector2D.x, this.y - vector2D.y)
}

Vector2D.prototype.scalarMultiply = function(scalar) {
  return new Vector2D(this.x * scalar, this.y * scalar)
}

Vector2D.prototype.resize = function(size) {
  return this.scalarMultiply(size / this.distance())
}

Vector2D.prototype.normalize = function() {
  return this.resize(1.0)
}

Vector2D.prototype.distance = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y))
}

Vector2D.prototype.cut = function(size) {
  if (this.distance() > size) {
    return this.resize(size)
  }
  return this
}

Vector2D.prototype.rotate = function(angle) {
  angle = -angle
  return new Vector2D(
    this.x * Math.cos(angle) - this.y * Math.sin(angle),
    this.x * Math.sin(angle) + this.y * Math.cos(angle)
  )
}

Vector2D.prototype.dot = function(vector2D) {
  return this.x * vector2D.x + this.y * vector2D.y
}

Vector2D.prototype.toString = function() {
  return "{x:" + this.x + ",y:" + this.y + "}"
}

Vector2D.prototype.getAngle = function() {
  return -Math.atan2(this.y, this.x)
}

Vector2D.prototype.minus = function() {
  return this.scalarMultiply(-1.0)
}

Vector2D.prototype.equals = function(vector2D) {
  const dx = this.x - vector2D.x
  const dy = this.y - vector2D.y
  return -VECTOR_2D_EPSILON < dx &&  dx < VECTOR_2D_EPSILON
      && -VECTOR_2D_EPSILON < dy && dy < VECTOR_2D_EPSILON
}

Vector2D.prototype.distanceTo = function(vector) {
  return Vector2D.distanceBetween(this, vector)
}

Vector2D.prototype.isNull = function() {
  return -VECTOR_2D_EPSILON < this.x && this.x < VECTOR_2D_EPSILON
    && -VECTOR_2D_EPSILON < this.y && this.y < VECTOR_2D_EPSILON
}
