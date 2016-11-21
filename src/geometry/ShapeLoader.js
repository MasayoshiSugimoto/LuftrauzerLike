"use strict";

const ShapeLoader = {
	create() {
		return Object.create(this.template);
	},

	template: {
		util: Util.create(),

		//List of shapes. Data file containing drawable objects to be loaded at startup.
		//If an object contain children, it will be created as a tree.
		load(shapes) {
			this.util.assert(null != shapes);

			//Create a map of shapes from the data
			let shapeMap = new Map();
			for (let key in shapes) {
				shapeMap.set(key, this.loadRecursively(shapes[key]));
			}
			return shapeMap;
		},

		//Load a shape
		//If an object contain children, it will be created as a tree.
		loadRecursively(shape) {
			this.util.assert(null != shape);

			//Create the shape
			let drawObject = EmptyDrawObject;
			switch (shape.type) {
				case "Rectangle":
					drawObject = RectangleDrawObjectMaker
						.create(Rectangle.fromData(shape));
					break;
				default:
					this.util.assert(false, "Unknown shape type in shapes. shape:" + shape);
			}

			//Wrap the shape in a tree node
			let children = shape.children;
			if (!this.util.defined(children)) {
				children = [];
			}

			let drawNode = DrawObjectTreeNodeMaker.create(drawObject);
			//Create the children
			for (let index = 0; index < children.length; index++) {
				drawNode.addDrawObject(
						this.loadRecursively(children[index]));
			}

			return drawNode;
		}

	}
};
