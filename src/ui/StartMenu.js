"use strict";

const StartMenu = {
  create(images, windowObject, onEnterPressedCallback) {

    const canvas = Canvas.create(document.getElementById("canvas"), window)
      .fullScreen()
      .clear()
      .setBackgroundColor("#66ccff"); //Blue sky background

    //Setup title
    const titleImageDrawObject = ImageDrawObject.create(images.get('images/Title.png'))
        .setScale(3.0);
    canvas.center(titleImageDrawObject);

    //Dummy target for the purpose of the camera
    //TODO: Create another camera for this purpose
    const target = {
      getPosition() {
        return canvas.getCenter();
      }
    };

    //Draw title
    const drawObjectManager = DrawObjectManager.create().add(titleImageDrawObject);

    //Clouds
    CloudGenerator.create(drawObjectManager, images, Cloud, ImageDrawObject);

    drawObjectManager.draw(Camera.create(canvas, target));

    //Setup keyboard handlers.
    windowObject.onkeydown = (event) => {
      if (event.which == KEYBOARD_KEY_ENTER) {
        onEnterPressedCallback();
      }
    }
    return Object.assign({ }, this.proto);
  },
  proto: {
    update(elapsedTimeSecond) {
      //Play effect on the title
    }
  }
};
