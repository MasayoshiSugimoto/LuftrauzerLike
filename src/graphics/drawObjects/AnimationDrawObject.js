"use strict";

//Define the animation modes
const AnimationDrawObject = {
  
  create(images, ship) {
    return Object.assign(
      {
        images: images,
        position: Vector2D.zero(),
        direction: 0.0,
        scale: 1.0,
        opacity: 1.0,
        animationSelector: AnimationDrawObject.AnimationSelector(images, ship),
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

    getCurrentImage() {
      return this.images[MathUtil.clamp(0, this.animationSelector.getIndex(), this.images.length)];
    },

    updateAnimationSelector(elapsedTimeSecond) {
      this.animationSelector.update(elapsedTimeSecond);
      return this;
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

AnimationDrawObject.MAX_ANIMATION_DURATION_SECOND  =  2.0;
AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX    =  15;
AnimationDrawObject.ANIMATION_OFFSET_MAX           =  15;
AnimationDrawObject.DIRECTION_LEFT                 =  -1.0;
AnimationDrawObject.DIRECTION_STRAIGHT             =  -0.0;
AnimationDrawObject.DIRECTION_RIGHT                =  1.0;

AnimationDrawObject.AnimationSelector = (images, ship) => {
  return {
    timeAccumulatorSecond: 0.0,
    direction: AnimationDrawObject.DIRECTION_STRAIGHT,
    previousShipDirection: ship.getDirection(),
    startFrameIndex: AnimationDrawObject.GO_STRAIGHT_ANIMATION_INDEX,

    update(elapsedTimeSecond) {

      let direction = AnimationDrawObject.DIRECTION_STRAIGHT;
      //Select which direction to turn
      let deltaDirection = Angle.create(ship.getDirection())
          .substract(Angle.create(this.previousShipDirection))
          .get();
      if (Math.abs(deltaDirection) < MathUtil.EPSILON) { //No change
        direction = AnimationDrawObject.DIRECTION_STRAIGHT;
      } else if (deltaDirection > 0.0) { //Turn right
        direction = AnimationDrawObject.DIRECTION_RIGHT;
      } else { //Turn left
        direction = AnimationDrawObject.DIRECTION_LEFT;
      }
      this.previousShipDirection = ship.getDirection();

      //Update the time accumulator
      if (this.direction != direction) {
        this.startFrameIndex = this.getIndex(); //Save the frame at which the change happen
        this.direction = direction;
        this.timeAccumulatorSecond = 0.0;
      }
      this.timeAccumulatorSecond += elapsedTimeSecond;

      return this;
    },

    //Return the index of the image to use in the animation
    getIndex() {
      let currentFrameIndex = this.startFrameIndex +
          Math.floor((this.timeAccumulatorSecond / 2.0) * AnimationDrawObject.ANIMATION_OFFSET_MAX) * this.direction;
      return Math.max(Math.min(currentFrameIndex, images.length), 0)
    },
  };
};
