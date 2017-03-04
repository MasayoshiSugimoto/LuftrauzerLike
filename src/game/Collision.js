"use strict";

const CollisionManager = {

  create(gameObjects) {

    //Filter only gameObjects which collision are applied to
    let collisionableObjects = {
      forEach(callback) {
        gameObjects.filter( (gameObject) => {
            return null != gameObject.collide;
          } )
          .forEach(callback);
      }
    };

    return Object.assign(
      {
        collisionableObjects: collisionableObjects
      },
      this.proto
    );
  },

  proto: {

    applyCollision() {
      this.collisionableObjects.forEach( (gameObject1) => {
        this.collisionableObjects.forEach( (gameObject2) => {
          if (gameObject1 == gameObject2) {
            return;
          }

          let position1 = gameObject1.getPosition();
          let position2 = gameObject2.getPosition();
          //If there is a collision
          if (position1.distanceTo(position2) - gameObject1.getRadius() - gameObject2.getRadius()
              <= 0.0) {
            gameObject1.collide();
          }

        } );
      } );
    }

  }
};
