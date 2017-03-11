"use strict";

{ //Test Task
  const util = Util.create();

  let result = "";
  const task = Task()
      .then( () => { result += "1"  } )
      .then( (nextTask) => {
          result += "2";
          window.setTimeout(nextTask.getCallback(), 10);
          result += "3";
        } )
      .then( () => { result += "4"} )
      .then( (nextTask) => {
          result += "5";
          window.setTimeout(nextTask.getCallback(), 10);
        } )
      .then( () => { result += "6"; } )
      .then( () => { util.assert(result == "123456"); } )
      .launch();
}
