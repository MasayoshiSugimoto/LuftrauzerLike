"use strict";

function RectangleComposite(state) {
	return {
		getSize() {
			return this.size;
		},

		setSize(size) {
			this.size = size;
			return this;
		},

		getGeometryType() {
			return "Rectangle";
		}
	}
}
