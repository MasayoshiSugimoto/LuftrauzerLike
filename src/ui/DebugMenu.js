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
      }
    };
  }
};
