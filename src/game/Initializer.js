"use strict";

//This class declare lazy getters to chain object creations
const Initializer = {
  
  getDrawObjectManager() {
    if (null == this.drawObjectManager) {
      this.drawObjectManager = DrawObjectManager.create();
    }
    return this.drawObjectManager;
  },

  getGameObjectManager() {
    if (null == this.gameObjectManager) {
      this.gameObjectManager = new Array();
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
      this.canvas = Canvas.create(document.getElementById("canvas"));
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
      this.machineGun = MachineGunFactory.create(Bullet, this.getDrawObjectManager(), GameObjectDrawObject)
          .createMachineGun(this.getShip());
    }
    return this.machineGun;
  }

};
