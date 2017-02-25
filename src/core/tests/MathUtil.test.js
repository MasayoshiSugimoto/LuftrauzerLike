"use strict";

{ //Test clamp
  let util = Util.create();

  util.assertEqualFloat(2.0, MathUtil.clamp(1.0, 2.0, 3.0)); //No change
  util.assertEqualFloat(1.0, MathUtil.clamp(1.0, 0.0, 3.0)); //Less than minimum
  util.assertEqualFloat(3.0, MathUtil.clamp(1.0, 4.0, 3.0)); //More than maximum
}
