"use strict";

const GRAVITY_CONSTANT            = 9.80665;
const GRAVITY_VECTOR              = Vector2D.create(0,GRAVITY_CONSTANT);

const LuftrauzerLike = {

  create() {

    return {

      //First function to be called.
      //Setup the game before starting the game loop
      //This function is only called once at startup
      startGame() {
        const that = this;
        const onImagesLoaded = (images) => {
          that.sharedInitializer = SharedInitializer(images);
          StartMenu.create(images, window, () => { SurvivalBattle.create(images, that.sharedInitializer); }, that.sharedInitializer);
        };
        ImageLoader.load(ImageFactory, IMAGE_DATA, onImagesLoaded);
      },

    };
  }

};


