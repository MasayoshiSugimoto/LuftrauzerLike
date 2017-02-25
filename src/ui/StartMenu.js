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

    const camera = Camera.create(canvas, target);
    drawObjectManager.draw(camera);

    const startMenu = Object.assign({
        titleImageDrawObject: titleImageDrawObject,
        drawObjectManager: drawObjectManager,
        canvas: canvas,
        camera: camera,
      }, this.proto);

    const scheduler = Scheduler.create(Time.create());

    //Setup keyboard handlers.
    windowObject.onkeydown = (event) => {
      if (event.which == KEYBOARD_KEY_ENTER) {
        scheduler.cancel();
        onEnterPressedCallback();
      }
    }

    scheduler.callByInterval(
        (elapsedTimeSecond) => { startMenu.update(elapsedTimeSecond); },
        FRAME_TIME_MILLISECOND);

    return startMenu;
  },
  proto: {
    update(elapsedTimeSecond) {
      this.canvas.fullScreen()
        .clear()
        .setBackgroundColor("#66ccff"); //Blue sky background
      this.canvas.center(this.titleImageDrawObject);
      this.drawObjectManager.draw(this.camera);
    }
  }
};
