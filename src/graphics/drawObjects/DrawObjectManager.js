"use strict";

const DrawObjectManager = {

  create() {

    return Object.assign(
      {
        drawObjects: []
      },
      {

        add(drawObject) {
          this.drawObjects.push(drawObject);
          return this;
        },

        length() {
          return this.drawObjects.length;
        },

        get(index) {
          return this.drawObjects[index];
        },

        remove(drawObject) {
          this.drawObjects = this.drawObjects.filter( function(element) {
            return element != drawObject;
          } );
          return this;
        },

        clean() {
          this.drawObjects = this.drawObjects.filter( (drawObject) => {
            return !drawObject.toDelete();
          } );
          return this;
        },

        draw(camera, elapsedTimeSecond) {
          //Clean the list of draw objects
          this.clean();

          let canvasContext = camera.getCanvas().getContext();
          canvasContext.save();

          //Move the context to the camera
          canvasContext.translate(
              camera.getCanvasTranslation().getX(),
              camera.getCanvasTranslation().getY());

          this.drawAllObjects(canvasContext, elapsedTimeSecond);

          canvasContext.restore();

          return this;
        },

        drawAllObjects(canvasContext, elapsedTimeSecond) {

          this.drawObjects.forEach( function(drawObject) {
            canvasContext.save();
            let position = drawObject.getScreenPosition();
            canvasContext.translate(position.getX(), position.getY());
            canvasContext.rotate(drawObject.getDirection());
            drawObject.draw(canvasContext, elapsedTimeSecond);
            canvasContext.restore();
          } );

          return this;
        }

      }

    );
  }

};
