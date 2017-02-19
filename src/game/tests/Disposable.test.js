"use strict";

{ // Test 'Disposable'
  let util = Util.create();

  let object = { };
  Object.assign(object, Disposable(object));

  util.assert(!object.toDelete());
  object.markForDeletion();
  util.assert(object.toDelete());
}
