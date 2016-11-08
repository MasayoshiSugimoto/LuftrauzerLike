const EPSILON = 0.00001; //Small float used to compensate error intruced by floats.

const Util = {
	create() {
		return Object.create(this.template);
	},
	
	template: {
		assert(condition,message) {
			if (!condition) {
				throw message || "Assertion failure.";
			}
		},

		compareFloat(float1,float2) {
			return -EPSILON < (float1 - float2) && (float1 - float2) < EPSILON;
		}
	}

}
