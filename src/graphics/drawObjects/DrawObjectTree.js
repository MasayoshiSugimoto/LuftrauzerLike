"use strict";

//Tree node of draw object tree.
const DrawObjectTree = {

	fromData(drawObject) {
		let node = Object.create(this.proto);
		node.drawObject = drawObject;
		node.children = [];
		return node;
	},

	proto: {

		getPosition() {
			return this.drawObject.getPosition();
		},

		setPosition(position) {
			return this.drawObject.setPosition(position);
		},

		getSize() {
			return this.drawObject.getSize();
		},

		getDirection() {
			return this.drawObject.getDirection();
		},

		setDirection(direction) {
			return this.drawObject.setDirection(direction);
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
