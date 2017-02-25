"use strict";

const Rectangle = {

  fromData(rectangle) {
    Util.create().assert(rectangle.type == "Rectangle");
    let rectangleObject = this.create();
    rectangleObject.setPosition(Vector2D.fromData(rectangle.position));
    rectangleObject.setDirection(rectangle.direction);
    rectangleObject.setSize(Vector2D.fromData(rectangle.size));
    return rectangleObject;
  },

  create() {
    let state = {
      position:   Vector2D.zero(),
      size:       Vector2D.zero(),
      direction:  0.0 //Gradian
    };

    return Object.assign(
      state,
      RectangleComposite(state),
      PositionableComposite(state)
    );
  }

};
