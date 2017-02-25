"use strict";

{ //Test load
  let util = Util.create();
  let imagesUrls = ["url1", "url2"];
  let lastFunction = "";
  let onFinishCallback = (images) => {
    util.assert(images.get("url1").src == "url1");
    util.assert(images.get("url2").src == "url2");
    lastFunction = "onFinishCallback";
  };

  let createImage = () => {
    return {
      src: "",
      onload() { util.assert(false); }
    };
  };

  let images = [createImage(), createImage()];

  let imageCreationIndex = 0;
  let imageFactory = () => {
    util.assert(imageCreationIndex < 2);
    let result = images[imageCreationIndex]
    imageCreationIndex++;
    return result;
  }

  ImageLoader.load(imageFactory, imagesUrls, onFinishCallback);
  images[1].onload();
  util.assert(lastFunction == "");
  images[1].onload();
  util.assert(lastFunction == "onFinishCallback");
}
