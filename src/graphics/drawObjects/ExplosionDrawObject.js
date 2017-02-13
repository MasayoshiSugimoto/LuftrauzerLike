"use strict";

const ExplosionDrawObject = {
  create(image) {
    return Object.assign(
      {
        image:    image,
        scale:    1.0,
        opacity:  1.0,
      },
      this.proto
    );
  },
  proto: {

    setScale(scale) {
      this.scale = scale;
      return this;
    },

    getSize() {
      return Vector2D.create(this.image.width * this.scale, this.image.height * this.scale);
    },

    setOpacity(opacity) {
      this.opacity = opacity;
      return this;
    },

    draw(canvasContext) {
      let previousOpacity = canvasContext.globalAlpha;
      canvasContext.globalAlpha = this.opacity;
      let size = this.getSize();
      canvasContext.drawImage(
        this.image, 
        -size.getX() / 2,		//x coordinate
        -size.getY() / 2,		//y coordinate
        size.getX(),				//width
        size.getY());				//height
      canvasContext.globalAlpha = previousOpacity;
      return this;
    }

  }
};

const ExplosionDrawObjectFactory = (images) => {
  return {
    create() {
      return ExplosionDrawObject.create(images.get('images/Explosion.png'));
    }
  };
};
