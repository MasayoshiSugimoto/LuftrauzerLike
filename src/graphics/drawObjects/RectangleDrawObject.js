"use strict";

const RectangleDrawObject = {

  create() {
    let state = {
      className: "RectangleDrawObject",
      position: Vector2D.zero(),
      direction: 0,
      size: Vector2D.zero(),
      color: "green",


      draw(canvasContext) {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(
          -this.getSize().getX()/2,
          -this.getSize().getY()/2,
          this.getSize().getX(),
          this.getSize().getY());
      },

      toDelete() {
        return false;
      }

    };

    return Object.assign(
      state,
      PositionableComposite(state),
      RectangleComposite(state)
    );
  },

  fromData(rectangle) {
    let util = Util.create();
    util.assert(rectangle.type == "Rectangle");
    let rectangleObject = this.create();
    rectangleObject.setPosition(Vector2D.fromData(rectangle.position));
    rectangleObject.setDirection(rectangle.direction);
    rectangleObject.setSize(Vector2D.fromData(rectangle.size));
    rectangleObject.color = rectangle.color;
    return rectangleObject;
  }

};
