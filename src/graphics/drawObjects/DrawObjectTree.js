"use strict";

//Tree node of draw object tree.
const DrawObjectTree = {

	create(drawObject) {
		let node = Object.create(this.template);
		node.drawObject = drawObject;
		node.children = [];
		return node;
	},

	template: {

		getPosition() {
			return this.drawObject.getPosition();
		},

		getSize() {
			return this.drawObject.getSize();
		},

		getDirection() {
			return this.drawObject.getDirection();
		},

		getChildren() {
			return this.children;
		},

		getGeometryType() {
			return this.drawObject.getGeometryType();
		},

		setDrawObjects(children) {
			this.children = children;
		},

		addDrawObject(drawObject) {
			this.children.push(drawObject);
		},

		draw(canvasContext) {

			//Draw the node object
			canvasContext.save();	
			this.drawObject.placeOn(canvasContext);
			this.drawObject.draw(canvasContext);
			//Draw the children inside the context of the parent:
			//the children position are relative to the parent object.
			this.children.forEach( function(item,index) {
				item.draw(canvasContext);
			} )
			canvasContext.restore();

		}

	}
};
