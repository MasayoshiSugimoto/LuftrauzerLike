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
        ImageLoader.load(ImageFactory, IMAGE_DATA, (images) => {
            that.sharedInitializer = SharedInitializer(images);
            that.runGame();
          } );
      },

      runGame() {
        const that = this;
        const startStartMenu = () => { StartMenu.create(window, that.sharedInitializer, startSurvivalBattle); };
        const startSurvivalBattle = () => { SurvivalBattle.create(that.sharedInitializer, restartGame) };
        const restartGame = () => { that.runGame() };
        startStartMenu();
      }
    };
  }

};


