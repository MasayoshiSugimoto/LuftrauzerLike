"use strict";

const DebugMenu = {
  create(documentObject) {
    return {
      debugMenuDomElement: documentObject.getElementById("debugMenu") || documentObject.createElement("div"),

      appendDiv(id) {
        const div = documentObject.createElement("div");
        div.id = id;
        this.debugMenuDomElement.appendChild(div);
        return div;
      },

      setField(id, text) {
        const div = documentObject.getElementById(id) || this.appendDiv(id);
        div.textContent = text;
        return this;
      },

      setFramePerSecond(framePerSecond) {
        return this.setField("framePerSecond", "Frame per second: " + framePerSecond);
      },

      setDrawObjectManagerSize(size) {
        return this.setField("drawObjectManagerSize", "DrawObjectManager size: " + size);
      },

      setGameObjectManagerSize(size) {
        return this.setField("gameObjectManagerSize", "GameObjectManager size: " + size);
      },

    };
  }
};
