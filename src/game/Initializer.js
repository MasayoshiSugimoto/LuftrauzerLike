"use strict";

//This class declare lazy getters to chain object creations
const Initializer = (images) => {

  return {

    images: images,

    getDrawObjectManager() {
      if (null == this.drawObjectManager) {
        this.drawObjectManager = DrawObjectManager.create();
      }
      return this.drawObjectManager;
    },

    getGameObjectManager() {
      if (null == this.gameObjectManager) {
        this.gameObjectManager = GameObjectManager.create();
      }
      return this.gameObjectManager;
    },

    getShip() {
      if (null == this.ship) {
        this.ship = ShipFactory(this.getGameObjectManager()).createShip()
      }
      return this.ship;
    },

    getCanvas() {
      if (null == this.canvas) {
        this.canvas = Canvas.create(document.getElementById("canvas"), window);
      }
      return this.canvas;
    },

    getCamera() {
      if (null == this.camera) {
        this.camera = Camera.create(this.getCanvas(), this.getShip());
      }
      return this.camera;
    },

    getGameMap() {
      if (null == this.gameMap) {
        this.gameMap = GameMap.create(this.getGameObjectManager());
      }
      return this.gameMap;
    },

    getCollisionManager() {
      if (null == this.collisionManager) {
        this.collisionManager = CollisionManager.create(this.getGameObjectManager());
      }
      return this.collisionManager;
    },

    getMachineGun() {
      if (null == this.machineGun) {
        this.machineGun = MachineGunFactory.create(
              BulletFactory(),
              this.getDrawObjectManager(),
              GameObjectDrawObject,
              this.images,
              ImageDrawObject
            )
            .createMachineGun(this.getShip());
      }
      return this.machineGun;
    },

    getSimpleEnemyFactory() {
      if (null == this.simpleEnemyFactory) {
        this.simpleEnemyFactory = SimpleEnemyFactory(this.getGameObjectManager(), this.getShip());
      }
      return this.simpleEnemyFactory;
    },

    getSimpleEnemyCompositeFactory() {
      if (null == this.simpleEnemyCompositeFactory) {
        this.simpleEnemyCompositeFactory = SimpleEnemyCompositeFactory(
          this.getSimpleEnemyFactory(),
          ImageDrawObject,
          this.getGameObjectDrawObjectFactory(),
          this.images,
          this.getDrawObjectManager()
        );
      }
      return this.simpleEnemyCompositeFactory;
    },

    getGameObjectDrawObjectFactory() {
      if (null == this.gameObjectDrawObjectFactory) {
        this.gameObjectDrawObjectFactory = GameObjectDrawObjectFactory(
              ExplosionDrawObjectFactory(this.images),
              EmptyGameObject);
      }
      return this.gameObjectDrawObjectFactory;
    },

  };

};
