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

    getShipKeyboardController() {
      if (null == this.shipKeyboardController) {
        this.shipKeyboardController = BorderController(
            ShipKeyboardController(window),
            GameMap());
      }
      return this.shipKeyboardController;
    },

    getShip() {
      if (null == this.ship) {
        this.ship = ShipFactory(this.getShipKeyboardController())
            .createShip();
        this.getShipKeyboardController().setShip(this.ship);
      }
      return this.ship;
    },

    getShipComposite() {
      if (null == this.shipComposite) {
        this.shipComposite = ShipCompositeFactory(
            this.getShip(),
            ImageDrawObject,
            this.getGameObjectDrawObjectFactory(),
            this.getGameObjectManager(),
            this.getDrawObjectManager(),
            this.getFaction(),
            this.images)
          .create();
      }
      return this.shipComposite;
    },

    getCanvas() {
      if (null == this.canvas) {
        this.canvas = Canvas.create(document.createElement("canvas"), window);
      }
      return this.canvas;
    },

    getCamera() {
      if (null == this.camera) {
        this.camera = Camera.create(this.getCanvas(), this.getShip());
      }
      return this.camera;
    },

    getCollisionManager() {
      if (null == this.collisionManager) {
        this.collisionManager = CollisionManager
            .create(this.getGameObjectManager(), this.getFaction());
      }
      return this.collisionManager;
    },

    getMachineGun() {
      if (null == this.machineGun) {
        this.machineGun = MachineGunFactory.create(
              this.getBulletCompositeFactory(),
              window
            )
            .createMachineGun(this.getShip());
        //Resolve circular dependency on ShipKeyboardController
        const machineGun = this.machineGun;
        this.getShipKeyboardController().setOnFireStartCallback( () => { machineGun.onFireStart(); } );
        this.getShipKeyboardController().setOnFireStopCallback( () => { machineGun.onFireStop(); } );
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

    getBulletFactory() {
      if (null == this.bulletFactory) {
        this.bulletFactory = Bullet;
      }
      return this.bulletFactory;
    },

    getBulletCompositeFactory() {
      if (null == this.bulletCompositeFactory) {
        this.bulletCompositeFactory = BulletCompositeFactory(
            this.getBulletFactory(),
            ExplosionDrawObjectFactory(this.images),
            this.getGameObjectDrawObjectFactory(),
            this.getGameObjectManager(),
            this.getDrawObjectManager(),
            this.getFaction());
      }
      return this.bulletCompositeFactory;
    },

    getFaction() {
      if (null == this.faction) {
        this.faction = Faction.create();
      }
      return this.faction;
    },

  };

};
