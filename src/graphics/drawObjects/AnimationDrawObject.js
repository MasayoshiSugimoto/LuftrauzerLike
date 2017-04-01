"use strict";

const AnimationDrawObject = {
  
  create(images) {
    return Object.assign(
      {
        images: images,
        currentImageIndex: 0,
        position: Vector2D.zero(),
        direction: 0.0,
        scale: 1.0,
        opacity: 1.0,
      },
      this.proto
    );
  },

  proto: {
    getScreenPosition() {
      return this.position;
    },

    setScreenPosition(position) {
      this.position = position;
      return this;
    },

    getDirection() {
      return this.direction;
    },

    setDirection(direction) {
      this.direction = direction;
      return this;
    },

    getScale() {
      return this.scale;
    },

    setScale(scale) {
      this.scale = scale;
      return this;
    },

    getSize() {
      return Vector2D.create(this.getCurrentImage().width, this.getCurrentImage().height)
          .scalarMultiply(this.scale);
    },

    getCenter() {
      return this.getSize().scalarMultiply(0.5);
    },

    setOpacity(opacity) {
      this.opacity = opacity;
      return this;
    },

    setCurrentImageIndex(index) {
      this.currentImageIndex = index;
      return this;
    },

    getCurrentImage() {
      let index = this.currentImageIndex;
      if (index >= this.images.length) {
        index = 0;
      }
      return this.images[index];
    },

    draw(canvasContext) {
      let size = this.getSize();
      let previousOpacity = canvasContext.globalAlpha;
      canvasContext.globalAlpha = this.opacity;
      canvasContext.drawImage(
        this.getCurrentImage(),
        -size.getX() / 2,    //x coordinate
        -size.getY() / 2,    //y coordinate
        size.getX(),        //width
        size.getY());        //height
      canvasContext.globalAlpha = previousOpacity;
      return this;
    },

    toDelete() {
      return false;
    }
  }
};
