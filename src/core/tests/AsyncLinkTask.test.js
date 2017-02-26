"use strict";

{
  const util = Util.create();

  let asyncFunction = (callback) => {
    callback(counter + 1);
  };

  let counter = 0;

  const task = AsyncLinkTask.create( (callback) => {
      asyncFunction( (newCounter) => { counter = newCounter; callback() }, counter);
    } ).then( (callback) => {
      asyncFunction( (newCounter) => { counter = newCounter; callback() }, counter);
    } ).then( (callback) => {
      util.assert(counter == 2);
    } ).launch();
}
