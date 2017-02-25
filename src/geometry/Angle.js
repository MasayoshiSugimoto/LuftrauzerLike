"use strict";

/*
 * This class represent an angle between -PI and PI.
 */
const Angle = {

  create(angleInRadian) {

    let angleObject = Object.assign(
      {
        angleInRadian: angleInRadian
      },
      {

        //Convert the angle set to fit within -PI and PI.
        set(angleInRadian) {

          let divisor = 0;
          //Round to zero
          if (angleInRadian > 0.0) {
            divisor = Math.floor(angleInRadian / PIx2);
          } else {
            divisor = Math.ceil(angleInRadian / PIx2);
          }

          //Remove modulo
          angleInRadian = angleInRadian - divisor * PIx2;

          //Change the side if bigger than PI
          if (angleInRadian < -Math.PI) {
            angleInRadian = angleInRadian + PIx2;
          } else if (angleInRadian > Math.PI) {
            angleInRadian = angleInRadian - PIx2;
          }

          //Set the value
          this.angleInRadian = angleInRadian;

          return this;
        },

        get() {
          return this.angleInRadian;
        },

        minus() {
          this.angleInRadian = -this.angleInRadian;
          return this;
        },

        add(angle) {
          return Angle.create(this.get() + angle.get());
        },

        substract(angle) {
          return Angle.create(this.get() - angle.get());
        },

        equals(angle) {
          let deltaAngle = Angle.create(this.get() - angle.get()).get();
          if (-EPSILON < deltaAngle && deltaAngle < EPSILON) {
            return true;
          }
          return false;
        }

      }
    );

    return angleObject.set(angleInRadian);

  },

};

