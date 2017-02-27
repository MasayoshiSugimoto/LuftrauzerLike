"use strict";

const DebugMenu = {
  create(documentObject) {
    return {
      debugMenuDomElement: documentObject.getElementById("debugMenu") || documentObject.createElement("div"),

      getFramePerSecondDiv() {
        return documentObject.getElementById("framePerSecond");
      },
      
      setFramePerSecond(framePerSecond) {
        if (null == this.getFramePerSecondDiv()) {
          const div = documentObject.createElement("div");
          div.id = "framePerSecond";
          this.debugMenuDomElement.appendChild(div);
        }
        this.getFramePerSecondDiv().textContent = "Frame per second: " + framePerSecond;
        return this;
      },

      setDrawObjectManagerSize(size) {
        if (null == documentObject.getElementById("drawObjectManagerSize")) {
          const div = documentObject.createElement("div");
          div.id = "drawObjectManagerSize";
          this.debugMenuDomElement.appendChild(div);
        }
        documentObject.getElementById("drawObjectManagerSize").textContent = "DrawObjectManager size: " + size;
        return this;
      },

    };
  }
};
