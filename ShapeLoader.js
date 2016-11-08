const ShapeLoader = {
	create() {
		return Object.create(this.template);
	},

	template: {

		//List of shapes. Data file containing drawable objects to be loaded at startup.
		load(shapes) {
			shapeMap = new Map();
			for (key in shapes) {
				let shape = shapes[key];
				switch (shape.type) {
					case "Rectangle":
						shapeMap.set(key,Rectangle.fromData(shape));
						break;
					default:
						Util.assert(false, "Unknown shape type in shapes. shape:" + shape);
				}
			}
			return shapeMap;
		}

	}
};
