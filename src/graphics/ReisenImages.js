"use strict";

const ReisenImages = (images) => {

  const paths = [
    "images/Reisen-15.png",
    "images/Reisen-14.png",
    "images/Reisen-13.png",
    "images/Reisen-12.png",
    "images/Reisen-11.png",
    "images/Reisen-10.png",
    "images/Reisen-9.png",
    "images/Reisen-8.png",
    "images/Reisen-7.png",
    "images/Reisen-6.png",
    "images/Reisen-5.png",
    "images/Reisen-4.png",
    "images/Reisen-3.png",
    "images/Reisen-2.png",
    "images/Reisen-1.png",
    "images/Reisen.png",
    "images/Reisen2.png",
    "images/Reisen2.png",
    "images/Reisen3.png",
    "images/Reisen4.png",
    "images/Reisen5.png",
    "images/Reisen6.png",
    "images/Reisen7.png",
    "images/Reisen8.png",
    "images/Reisen9.png",
    "images/Reisen10.png",
    "images/Reisen11.png",
    "images/Reisen12.png",
    "images/Reisen13.png",
    "images/Reisen14.png",
    "images/Reisen15.png",
  ];

  return {
    get() {
      return paths.map( (path) => {
        return images.get(path);
      } );
    },
  }
};
