"use strict";

{ // Test 'Singleton'
  let util = Util.create();

  let expected = { };
  let factory = () => {
    return expected;
  };

  let singleton = Singleton(factory);
  util.assert(singleton.instance == null);
  util.assert(singleton.getInstance() == expected);
}
