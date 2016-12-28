"use strict";

const ImageLoader = {

  load(imageFactory, imageUrls, onFinishCallback) {

    let counter = 0;
    let images = new Array();

    for (let index = 0; index < imageUrls.length; index++) {
      //Load all the registered images.
      let image = imageFactory();
      images.push(image);
      image.onload = () => {
        counter++;
        if (counter >= imageUrls.length) {
          //When load is finished, can the callback function.
          onFinishCallback(images);
        }
      };
      image.src = imageUrls[index];
    }

  }

};