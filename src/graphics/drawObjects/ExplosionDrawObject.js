"use strict";

const EXPLOSION_DRAW_OBJECT_ANIMATION_TIME_SECONDS = 0.5;

const ExplosionDrawObject = {
  create(image) {
    return Object.assign(
      {
        image                 :  image,
        scale                 :  1.0,
        opacity               :  1.0,
        remainingTimeSecond   :  EXPLOSION_DRAW_OBJECT_ANIMATION_TIME_SECONDS
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

    getOpacity() {
      return this.opacity;
    },

    setOpacity(opacity) {
      this.opacity = opacity;
      return this;
    },

    draw(canvasContext, elapsedTimeSecond) {

      //Decrease opacity with time
      this.remainingTimeSecond -= elapsedTimeSecond;
      this.remainingTimeSecond = Math.max(this.remainingTimeSecond, 0.0);
      this.opacity = this.remainingTimeSecond / EXPLOSION_DRAW_OBJECT_ANIMATION_TIME_SECONDS;

      //Draw the object
      let previousOpacity = canvasContext.globalAlpha;
      canvasContext.globalAlpha = this.opacity;
      let size = this.getSize();
      canvasContext.drawImage(
        this.image,
        -size.getX() / 2,    //x coordinate
        -size.getY() / 2,    //y coordinate
        size.getX(),        //width
        size.getY());        //height
      canvasContext.globalAlpha = previousOpacity;
      return this;
    },

    toDelete() {
      return this.remainingTimeSecond <= 0.0;
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
