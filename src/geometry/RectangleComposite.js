"use strict";

const RectangleComposite = (state) => ({

	getSize() {
		return this.size;
	},

	setSize(size) {
		this.size = size;
	},

	getGeometryType() {
		return "Rectangle";
	}

})
